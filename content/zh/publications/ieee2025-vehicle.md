---
id: ieee2025-vehicle-detection
title: 'Fast Wrong-way Cycling Detection in CCTV Videos: Sparse Sampling is All You Need'
authors: [Jing Xu, Wentao Shi, Sheng Ren, Lijuan Zhang, Weikai Yang, Pan Gao, Jie Qin]
venue: IEEE Transactions on Intelligent Transportation Systems
venueType: journal
year: 2025
status: published
isFirstAuthor: false
isCoFirst: false
links:
  paper: 'https://ieeexplore.ieee.org/abstract/document/11306249/'
  code: 'https://github.com/VICA-Lab-HKUST-GZ/WWC-Predictor'
emoji: '🚗'
featuredImage: /images/publications/ITIS.png
---

有效监测异常交通行为（如逆行骑行）对优化执法部署和交通规划至关重要。然而，在资源有限的环境中准确记录所有逆行骑行事件既不必要也不可行，因为这需要高分辨率摄像机进行证据收集和事件检测。为解决这一挑战，我们提出了WWC-Predictor，这是一种高效估计逆行骑行比率的新方法，即一定时间内逆行骑行事件相对于总骑行数量的比例。我们方法的核心创新在于使用轻量级检测器在稀疏采样帧中准确检测逆行骑行事件，然后使用自回归移动平均模型估计总体比率。为评估我们方法的有效性，我们构建了一个包含35分钟视频序列的基准数据集。我们的方法实现了仅1.475%的平均错误率，同时仅消耗传统跟踪方法所需的19.12% GPU时间，验证了其在估计逆行骑行比率方面的有效性。
