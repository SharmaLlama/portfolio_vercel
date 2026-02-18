export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  const query = `
    query {
      user(login: "SharmaLlama") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              primaryLanguage {
                name
              }
              repositoryTopics(first: 5) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    if (data.errors) {
      return res.status(500).json({ error: data.errors[0].message });
    }

    const pinnedRepos = data.data.user.pinnedItems.nodes.map(repo => ({
      title: repo.name,
      description: repo.description || 'No description provided',
      tags: [
        repo.primaryLanguage?.name,
        ...repo.repositoryTopics.nodes.map(t => t.topic.name)
      ].filter(Boolean).slice(0, 4),
      link: repo.url,
      homepage: repo.homepageUrl
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(pinnedRepos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch pinned repos' });
  }
}
