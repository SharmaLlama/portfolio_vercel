import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Book, Code, FileText, User, Star, StarHalf, GitBranch, ExternalLink, ChevronRight, BookOpen, Award } from 'lucide-react';
import { books } from './data/books';
import { publications } from './data/publications';
import { blogPosts } from './data/blog';


const GoogleScholarIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 7l10-4 10 4-10 4z" />
    <path d="M6 9v5c0 2.2 2.7 4 6 4s6-1.8 6-4V9" />
    <path d="M20 7v5" />
    <circle cx="20" cy="13" r="1" fill="currentColor" />
  </svg>
);

export default function ResearchPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [bookFilter, setBookFilter] = useState('all');
  const [expandedBook, setExpandedBook] = useState(null);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/github-pinned')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGithubProjects(data);
        }
        setLoadingProjects(false);
      })
      .catch(() => setLoadingProjects(false));
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'opensource', label: 'Open Source', icon: GitBranch },
    { id: 'publications', label: 'Publications', icon: Award },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'bookshelf', label: 'Bookshelf', icon: BookOpen },
  ];


  const bookCategories = [
    { id: 'all', label: 'All' },
    { id: 'technical', label: 'Technical' },
    { id: 'fiction', label: 'Fiction' },
    { id: 'non-fiction', label: 'Non-Fiction' }
  ];
  const sortedBooks = [...books].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year; // Sort by year descending
    }
    // if (a.rating !== b.rating) {
    //   return b.rating - a.rating; // Sort by rating descending
    // }
    // Sort by author name (ascending, case-insensitive)
    const authorComp = a.author.localeCompare(b.author, undefined, { sensitivity: 'base' });
    if (authorComp !== 0) {
      return authorComp;
    }
    // Sort by book title (ascending, case-insensitive)
    return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
  });

  const filteredBooks = bookFilter === 'all' 
      ? sortedBooks 
    : sortedBooks.filter(book => book.category === bookFilter);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return [...Array(5)].map((_, i) => {
      if (i < fullStars) {
        return <Star key={i} size={14} className="fill-amber-400 text-amber-400" />;
      }
      if (i === fullStars && hasHalf) {
        return (
          <span key={i} className="relative inline-block" style={{ width: 14, height: 14 }}>
            <Star size={14} className="text-slate-600 absolute inset-0" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={14} className="fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      }
      return <Star key={i} size={14} className="text-slate-600" />;
    });
  };

  const HomePage = () => (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <div className="mb-20">
        <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
          <span className="text-cyan-400 text-sm">Research Engineer</span>
        </div>
        <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Building the Future
          </span>
          <br />
          <span className="text-slate-200">of Distributed Systems</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          Exploring Artificial Intelligence, reinforcement learning, distributed systems, and the intersection of theory and practice
          through hands-on projects and deep technical exploration.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className="px-6 py-3 bg-cyan-500 text-slate-950 rounded-lg font-semibold hover:bg-cyan-400 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            View Projects <ChevronRight size={20} />
          </button>
          {/* <button className="px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all flex items-center gap-2">
            <FileText size={20} /> Download Resume
          </button> */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Projects', value: githubProjects.length || '...' },
            { label: 'Blog Posts', value: '24' },
            { label: 'Papers Read', value: '50+' },
            { label: 'Contributions', value: '200+' },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Code className="text-cyan-400" size={32} />
            Featured Projects
          </h2>
          <button 
            onClick={() => setActiveTab('projects')}
            className="text-cyan-400 flex items-center gap-2 hover:gap-3 transition-all text-sm"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {githubProjects.slice(0, 3).map((project, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group cursor-pointer"
              onClick={() => window.open(project.link, '_blank')}
            >
              <div className="flex items-start justify-between mb-4">
                <Code className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-cyan-400" size={32} />
            Latest Posts
          </h2>
          <button 
            onClick={() => setActiveTab('blog')}
            className="text-cyan-400 flex items-center gap-2 hover:gap-3 transition-all text-sm"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>
        <div className="space-y-4">
          {blogPosts.slice(0, 2).map((post, i) => (
            <a
              key={i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:bg-slate-900 group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-slate-500 text-sm mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{post.excerpt}</p>
                </div>
                <ExternalLink className="text-slate-600 group-hover:text-cyan-400 transition-all" size={20} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Top Rated Books */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="text-cyan-400" size={32} />
            Top Rated Books
          </h2>
          <button 
            onClick={() => setActiveTab('bookshelf')}
            className="text-cyan-400 flex items-center gap-2 hover:gap-3 transition-all text-sm"
          >
            View Bookshelf <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...books].sort((a, b) => b.rating - a.rating).slice(0, 6).map((book, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-1 group cursor-pointer"
              onClick={() => setActiveTab('bookshelf')}
            >
              <div className="aspect-[2/3] bg-slate-800 overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(book.rating)}
                </div>
                <p className="text-slate-300 text-sm font-semibold line-clamp-2">{book.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Publications */}
      {/* <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Award className="text-cyan-400" size={32} />
            Recent Publications
          </h2>
          <button 
            onClick={() => setActiveTab('publications')}
            className="text-cyan-400 flex items-center gap-2 hover:gap-3 transition-all text-sm"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              title: 'Efficient Multi-Agent Coordination in Distributed RL Systems',
              venue: 'NeurIPS Workshop',
              year: 2025,
              type: 'Workshop Paper'
            },
            {
              title: 'Optimizing Consensus Protocols for High-Throughput Systems',
              venue: 'ArXiv Preprint',
              year: 2024,
              type: 'Preprint'
            }
          ].map((paper, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all cursor-pointer"
              onClick={() => setActiveTab('publications')}
            >
              <div className="flex items-start gap-3 mb-2">
                <Award className="text-cyan-400 mt-1" size={20} />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-200 mb-1">{paper.title}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 text-xs">
                      {paper.type}
                    </span>
                    <span className="text-slate-500">{paper.venue} • {paper.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Key Open Source Contributions */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <GitBranch className="text-cyan-400" size={32} />
            Open Source Highlights
          </h2>
          <button 
            onClick={() => setActiveTab('opensource')}
            className="text-cyan-400 flex items-center gap-2 hover:gap-3 transition-all text-sm"
          >
            View All <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { project: 'ray-project/ray', prs: 8, stars: '32k' },
            { project: 'pytorch/pytorch', prs: 5, stars: '85k' },
            { project: 'etcd-io/etcd', prs: 6, stars: '47k' },
            { project: 'apache/kafka', prs: 4, stars: '28k' }
          ].map((contrib, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all cursor-pointer"
              onClick={() => setActiveTab('opensource')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitBranch className="text-cyan-400" size={20} />
                  <span className="font-bold text-cyan-400">{contrib.project}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Star size={14} />
                    <span>{contrib.stars}</span>
                  </div>
                  <div className="text-cyan-400">{contrib.prs} PRs</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-32 pb-20">
      <h2 className="text-5xl font-bold mb-12">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-slate-300 leading-relaxed text-lg">
            I'm on a mission to become a research engineer specializing in distributed systems and reinforcement learning.
            Over the next 6-12 months, I'm diving deep into system design, consensus algorithms, and ML infrastructure.
          </p>
          <p className="text-slate-300 leading-relaxed text-lg">
            My approach combines rigorous theoretical understanding with practical implementation. I believe the best
            way to learn is by building, breaking, and rebuilding systems from scratch.
          </p>
          <p className="text-slate-300 leading-relaxed text-lg">
            When I'm not coding or reading papers, you'll find me exploring new technical books, contributing to open source,
            or writing about what I'm learning on my blog.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {['Distributed Systems', 'Reinforcement Learning', 'System Design', 'ML Infrastructure', 'Consensus Algorithms', 'Multi-Agent Systems'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-6 text-cyan-400">Current Focus</h3>
          <ul className="space-y-4">
            {[
              'Implementing Raft consensus from scratch',
              'Multi-agent RL systems',
              'Distributed training architectures',
              'Byzantine fault tolerance',
              'Reading foundational papers',
              'Contributing to Ray & PyTorch'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="pt-32 pb-20">
      <h2 className="text-5xl font-bold mb-12">Featured Projects</h2>
      
      {/* GitHub Contributions */}
      <div className="mb-12 bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Github className="text-emerald-400" size={24} />
          GitHub Contributions
        </h3>
        <img 
          src="https://ghchart.rshah.org/22d3ee/SharmaLlama" 
          alt="GitHub Contributions" 
          className="w-full"
        />
      </div>

      {loadingProjects ? (
        <div className="text-center text-slate-400 py-12">Loading projects from GitHub...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {githubProjects.map((project, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <Code className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                View Project <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const OpenSourcePage = () => (
    <div className="pt-32 pb-20">
      <h2 className="text-5xl font-bold mb-6">Open Source Contributions</h2>
      <p className="text-slate-400 text-lg mb-12 max-w-3xl">
        Contributing to the projects and communities that power my learning journey. (Soon to be updated)
      </p>
      
      <div className="space-y-6">
        {/* {[
          {
            project: 'ray-project/ray',
            description: 'Distributed computing framework for ML workloads',
            contributions: [
              'Improved multi-GPU training performance by 23%',
              'Fixed memory leak in distributed training loop',
              'Added support for custom schedulers in Ray Tune'
            ],
            prs: 8,
            stars: '32k',
            language: 'Python'
          },
          {
            project: 'pytorch/pytorch',
            description: 'Deep learning framework',
            contributions: [
              'Optimized distributed data parallel training',
              'Documentation improvements for distributed module',
              'Bug fixes in gradient accumulation'
            ],
            prs: 5,
            stars: '85k',
            language: 'C++'
          },
          {
            project: 'etcd-io/etcd',
            description: 'Distributed reliable key-value store',
            contributions: [
              'Performance optimization in Raft log replication',
              'Added metrics for leader election latency',
              'Improved error handling in client library'
            ],
            prs: 6,
            stars: '47k',
            language: 'Go'
          },
          {
            project: 'apache/kafka',
            description: 'Distributed event streaming platform',
            contributions: [
              'Enhanced consumer group rebalancing',
              'Fixed edge case in partition assignment',
              'Contributed to documentation on exactly-once semantics'
            ],
            prs: 4,
            stars: '28k',
            language: 'Java'
          }
        ].map((contrib, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="text-cyan-400" size={20} />
                  <h3 className="text-xl font-bold text-cyan-400">{contrib.project}</h3>
                  <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                    {contrib.language}
                  </span>
                </div>
                <p className="text-slate-400 mb-4">{contrib.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Star size={16} />
                  <span className="text-sm">{contrib.stars}</span>
                </div>
                <div className="text-cyan-400 text-sm">{contrib.prs} PRs merged</div>
              </div>
            </div>
            <div className="space-y-2">
              {contrib.contributions.map((item, j) => (
                <div key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                  <ChevronRight className="text-cyan-400 mt-0.5 flex-shrink-0" size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );

  const PublicationsPage = () => (
    <div className="pt-32 pb-20">
      <h2 className="text-5xl font-bold mb-6">Publications & Papers</h2>
      <p className="text-slate-400 text-lg mb-12 max-w-3xl">
        Publish papers and technical reports exploring Artificial Intelligence and miscellaneous topics.
      </p>
      
      <div className="space-y-6">
        {publications.map((paper, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-cyan-400" size={20} />
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 text-xs">
                    {paper.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">{paper.title}</h3>
                <p className="text-slate-400 text-sm mb-1">{paper.authors}</p>
                <p className="text-slate-500 text-sm mb-3">
                  {paper.venue} • {paper.year}
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">{paper.abstract}</p>
            <div className="flex gap-3">
              <a href={paper.link} className="px-4 py-2 bg-slate-800 text-cyan-400 rounded-lg text-sm hover:bg-slate-700 transition-colors flex items-center gap-2">
                <FileText size={16} />
                Read Paper
              </a>
              {paper.code && (
                <a href={paper.code} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors flex items-center gap-2">
                  <Code size={16} />
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BlogPage = () => (
    <div className="pt-32 pb-20">
      <h2 className="text-5xl font-bold mb-12">Latest Posts</h2>
      <div className="space-y-6">
        {blogPosts.map((post, i) => (
          <div
            key={i}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:bg-slate-900 group"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors"
                >
                  Read Post <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BookshelfPage = () => (
    <div className="pt-32 pb-20">
      <h2 className="text-5xl font-bold mb-6">Bookshelf</h2>
      <p className="text-slate-400 text-lg mb-8 max-w-3xl">
        Books that I have read and enjoyed (or sometimes not enjoyed).
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {bookCategories.map(category => (
          <button
            key={category.id}
            onClick={() => { setBookFilter(category.id); setExpandedBook(null); }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              bookFilter === category.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-cyan-500/30'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Books Grid - 6 columns on desktop, compact cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {filteredBooks.map((book, i) => {
          const isExpanded = expandedBook === i;
          return (
            <React.Fragment key={i}>
              {/* Compact Book Card */}
              <div
                onClick={() => setExpandedBook(isExpanded ? null : i)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 group
                  ${isExpanded
                    ? 'border-cyan-500/70 bg-slate-900 -translate-y-1 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-cyan-500/40 hover:-translate-y-1'
                  }`}
              >
                {/* Cover */}
                <div className="aspect-[2/3] bg-slate-800 overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info below cover */}
                <div className="p-2">
                  <h3 className={`font-semibold text-xs leading-tight mb-1 line-clamp-2 transition-colors ${isExpanded ? 'text-cyan-400' : 'text-slate-200 group-hover:text-cyan-400'}`}>
                    {book.title}
                  </h3>
                  <p className="text-slate-500 text-xs truncate">{book.author}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-0.5">
                      {renderStars(book.rating)}
                    </div>
                    <ChevronRight
                      size={12}
                      className={`text-slate-600 transition-all duration-200 ${isExpanded ? 'rotate-90 text-cyan-400' : 'group-hover:text-cyan-500'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Review Panel — spans full row width */}
              {isExpanded && (
                <div className="col-span-full bg-slate-900 border border-cyan-500/30 rounded-xl p-5 -mt-1 mb-2">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-lg font-bold text-cyan-400">{book.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          book.category === 'technical'
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                            : book.category === 'fiction'
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}>
                          {book.category}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{book.author} · Read in {book.year}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(book.rating)}
                        <span className="text-slate-500 text-xs ml-1">{book.rating}/5</span>
                      </div>
                      {book.review ? (
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {book.review}
                        </p>
                      ) : (
                        <p className="text-slate-600 text-sm italic">No review yet.</p>
                      )}
                    </div>
                    {/* Small cover thumbnail on the right */}
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded-md border border-slate-700 flex-shrink-0"
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Reading Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-14">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <Book className="text-cyan-400 mb-3" size={28} />
          <div className="text-3xl font-bold text-cyan-400 mb-1">{books.length}</div>
          <div className="text-slate-500">Books Read</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <Star className="text-cyan-400 mb-3" size={28} />
          <div className="text-3xl font-bold text-cyan-400 mb-1">{(sortedBooks.length > 0 ? (sortedBooks.reduce((sum, b) => sum + b.rating, 0) / sortedBooks.length).toFixed(1) : 0)}</div>
          <div className="text-slate-500">Avg Rating</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.2}px)`,
        }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-lg font-bold text-cyan-400 tracking-tight whitespace-nowrap">
                {'<Utkarsh  Sharma />'}
              </span>
            </div>
            <div className="hidden lg:flex items-center 4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all ${
                    activeTab === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-400 hover:text-cyan-400'
                  }`}
                >
                  <item.icon size={16} />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://github.com/SharmaLlama" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:sharmautkarsh0504@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={18} />
              </a>
              <a href="https://scholar.google.com/citations?user=agrJWw4AAAAJ&hl=en" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <GoogleScholarIcon size={22} />
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mt-4 flex items-center gap-3 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                <item.icon size={16} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-1">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'about' && <AboutPage />}
          {activeTab === 'projects' && <ProjectsPage />}
          {activeTab === 'opensource' && <OpenSourcePage />}
          {activeTab === 'publications' && <PublicationsPage />}
          {activeTab === 'blog' && <BlogPage />}
          {activeTab === 'bookshelf' && <BookshelfPage />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 relative z-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-slate-400">
                © 2026 Utkarsh Sharma. Built with React & Tailwind CSS
              </span>
            </div>
            <div className="flex items-center gap-6">
              {navItems.slice(1, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}