export const publications = [
  {
    title: 'Modelling cosmic radiation events in the tree-ring radiocarbon record',
    authors: 'Qingyuan Zhang, Utkarsh Sharma, Jordan A Dennis, Andrea Scifo, Margot Kuitems, Ulf Büntgen, Mathew J Owens, Michael W Dee, Benjamin JS Pope',
    venue: 'Proceedings of the Royal Society A: Mathematical, Physical and Engineering Sciences',
    year: 2022,
    type: 'Journal Article',
    abstract: 'Annually resolved measurements of the radiocarbon content in tree-rings have revealed rare sharp rises in carbon-14 production. These ‘Miyake events’ are likely produced by rare increases in cosmic radiation from the Sun or other energetic astrophysical sources. The radiocarbon produced is not only circulated through the Earth’s atmosphere and oceans, but also absorbed by the biosphere and locked in the annual growth rings of trees. To interpret high-resolution tree-ring radiocarbon measurements therefore necessitates modelling the entire global carbon cycle. Here, we introduce ‘ticktack’, the first open-source Python package that connects box models of the carbon cycle with modern Bayesian inference tools. We use this to analyse all public annual  tree data, and infer posterior parameters for all six known Miyake events. They do not show a consistent relationship to the solar cycle, and several display extended durations that challenge either astrophysical or geophysical models.',
    link: 'https://royalsocietypublishing.org/rspa/article/478/2266/20220497/56688',
    code: 'https://github.com/SharmaLlama/ticktack/'
  },
  {
    title: 'Ticktack: a Python package for carbon box modelling',
    authors: 'Utkarsh Sharma, Qingyuan Zhang, Jordan Dennis',
    venue: 'Journal of Open Source Software',
    year: 2023,
    type: 'Journal Article',
    abstract: 'Radiocarbon measurements from tree rings allow us to recover measurements of cosmic radiation from the distant past, and exquisitely calibrate carbon dating of archaeological sites. But in order to infer cosmic production rates from raw ΔC14 data, we need to model the entire global carbon cycle, from the production of radiocarbon in the stratosphere and troposphere to its uptake by the oceans and biosphere. Many such competing models exist, in which the Earth system is partitioned into ‘boxes’ with reservoirs of C12, C14, and coefficients of flow between them. ticktack 1 is the first open-source package for carbon box modelling, allowing you to specify your own model or load a model with the same parameters as several leading closed-source models. Built in Python on Google Jax (Bradbury et al., 2018), it solves the carbon box ordinary differential equations using diffrax (Kidger, 2021) with arbitrary parametric models of production rates. This forwards model is connected via a simple API to Bayesian inference using the MCMC engine emcee (Foreman-Mackey et al., 2013).',
    link: 'https://joss.theoj.org/papers/10.21105/joss.05084.pdf',
    code: 'https://github.com/SharmaLlama/ticktack/'
  },
  {
    title: 'Cross-Lingual Multimodal Retrieval-Augmented Generation for Open Question Answering in Tamil and Yoruba',
    authors: 'Kiran Raja, Mobareji Abejide, Arya Ram, Utkarsh Sharma, Benjamin Liu, Kevin Zhu',
    venue: 'NeurIPS 2025 Workshop on Structured Probabilistic Inference & Generative Modeling',
    year: 2025,
    type: 'Workshop Paper',
    abstract: 'As large language models (LLMs) with retrieval augmented generation (RAG) gain traction in multimodal knowledge base question answering (KBQA), concerns about their transfer to low resource languages (LRLs) remain unaddressed. We introduce LR-MMQA, a benchmark evaluating multimodal cross lingual retrieval and reasoning in LRLs. Using the hardest examples from WebQA and MultimodalQA, we build a high quality LRL benchmark through LLM assisted translation, human validation, and culturally aligned rewriting that reflects native speaker phrasing (i.e. what a native speaker would naturally ask) while preserving answerability. We also present XM-RAG, a cross lingual multimodal RAG pipeline for LRLs that reaches 38.1 answer accuracy, more than 7.8 points above the next best baseline. LR-MMQA exposes major performance gaps and failure modes in current systems. Notably, all baselines perform far below top English results (WebQA 64.4 and MultimodalQA 73.48), showing that existing methods still struggle with complex tasks in LRL settings. By releasing LR-MMQA and XM-RAG, we offer a resource to evaluate and address these gaps and guide progress toward equitable multimodal KBQA.',
    link: 'https://openreview.net/pdf?id=TWFnJxIRG5',
    code: '#'
  },
  {
    title: 'When Less is More: 8-bit Quantization Improves Continual Learning in Large Language Models',
    authors: 'Michael S Zhang, Rishi A Ruia, Arnav Kewalram, Saathvik Dharmapuram, Utkarsh Sharma, Kevin Zhu',
    venue: 'ArXiv Preprint',
    year: 2025,
    type: 'Workshop Paper',
    abstract: 'Catastrophic forgetting poses a fundamental challenge in continual learning, particularly when models are quantized for deployment efficiency. We systematically investigate the interplay between quantization precision (FP16, INT8, INT4) and replay buffer strategies in large language models, revealing unexpected dynamics. While FP16 achieves superior initial task performance (74.44% on NLU), we observe a striking inversion on subsequent tasks: quantized models outperform FP16 by 8-15% on final task forward accuracy, with INT4 achieving nearly double FP16s performance on Code generation (40% vs 20%). Critically, even minimal replay buffers (0.1%) dramatically improve retention - increasing NLU retention after Math training from 45% to 65% across all precision levels - with INT8 consistently achieving the optimal balance between learning plasticity and knowledge retention. We hypothesize that quantization-induced noise acts as implicit regularization, preventing the overfitting to new task gradients that plagues high-precision models. These findings challenge the conventional wisdom that higher precision is always preferable, suggesting instead that INT8 quantization offers both computational efficiency and superior continual learning dynamics. Our results provide practical guidelines for deploying compressed models in continual learning scenarios: small replay buffers (1-2%) suffice for NLU tasks, while Math and Code benefit from moderate buffers (5-10%), with quantized models requiring less replay than FP16 to achieve comparable retention.',
    link: 'https://arxiv.org/pdf/2512.18934',
    code: 'https://github.com/Festyve/LessIsMore'
  },
  {
    title: 'GamiBench: Evaluating Spatial Reasoning and 2D-to-3D Planning Capabilities of MLLMs with Origami Folding Tasks',
    authors: 'Ryan Spencer, Roey Yaari, Ritvik Vemavarapu, Joyce Yang, Steven Ngo, Utkarsh Sharma',
    venue: 'ArXiv Preprint',
    year: 2025,
    type: 'Workshop Paper',
    abstract: 'Multimodal large language models (MLLMs) are proficient in perception and instruction-following, but they still struggle with spatial reasoning: the ability to mentally track and manipulate objects across multiple views and over time. Spatial reasoning is a key component of human intelligence, but most existing benchmarks focus on static images or final outputs, failing to account for the sequential and viewpoint-dependent nature of this skill. To close this gap, we introduce GamiBench, a benchmark designed to evaluate spatial reasoning and 2D-to-3D planning in MLLMs through origami-inspired folding tasks. GamiBench includes 186 regular and 186 impossible 2D crease patterns paired with their corresponding 3D folded shapes, produced from six distinct viewpoints across three visual question-answering (VQA) tasks: predicting 3D fold configurations, distinguishing valid viewpoints, and detecting impossible patterns. Unlike previous benchmarks that assess only final predictions, GamiBench holistically evaluates the entire reasoning process--measuring cross-view consistency, physical feasibility through impossible-fold detection, and interpretation of intermediate folding steps. It further introduces new diagnostic metrics--viewpoint consistency (VC) and impossible fold selection rate (IFSR)--to measure how well models handle folds of varying complexity. Our experiments show that even leading models such as GPT-5 and Gemini-2.5-Pro struggle on single-step spatial understanding. These contributions establish a standardized framework for evaluating geometric understanding and spatial reasoning in MLLMs.',
    link: 'https://arxiv.org/pdf/2512.22207',
    code: 'https://github.com/stvngo/GamiBench'
  },

];
