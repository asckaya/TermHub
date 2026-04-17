---
id: arxiv2026-compress-explore
title: 'Compress the Easy, Explore the Hard: Difficulty-Aware Entropy Regularization for Efficient LLM Reasoning'
authors: [Qin-Wen Luo, Sheng Ren, Xiang Chen, Rui Liu, Jun Fang, Naiqiang Tan, Sheng-Jun Huang]
venue: arXiv
venueType: preprint
year: 2026
status: preprint
isFirstAuthor: false
isCoFirst: false
links:
  paper: 'https://arxiv.org/abs/2602.22642'
emoji: '🧠'
featuredImage: /images/publications/CEEH.png
---

思维链(CoT)大幅提升了大型语言模型(LLM)处理复杂推理任务的能力，但显式推理步骤的冗长性导致推理延迟和计算成本过高。现有压缩方法在追求简短性的同时往往牺牲了推理能力。我们发现这些方法的关键问题：明确优化更短轨迹会触发快速熵坍缩，过早缩小探索空间。为此我们提出CEEH（压缩简单问题，探索困难问题）， 一种难度感知的RL高效推理方法。CEEH动态评估实例难度以应用选择性熵正则化。在六个推理基准上，CEEH始终降低响应长度同时保持准确率。
