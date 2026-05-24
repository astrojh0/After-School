# Rhythm UI - 节奏时间流界面规格文档

## 1. 项目概述

- **项目名称**: Rhythm
- **项目类型**: React Web App (Vite + React + Tailwind + Framer Motion)
- **核心功能**: 基于节奏块的时间流界面，用连续的时间块展示一天的时间分配
- **设计理念**: UI不是"日程表"，是"时间流"；状态 > 内容

## 2. UI/UX 规格

### 布局结构

**主布局：**
- 左侧：TIME AXIS（时间轴）- 固定宽度 60px
- 右侧：MAIN CANVAS（主画布）- 自适应宽度
- 全屏纵向滚动

**页面结构：**
- 顶部：View Switcher（Day/Week 切换）
- 中间：Timeline（时间轴 + Blocks）
- 底部：无（保持极简）

### 视觉设计

**色彩系统：**
- 背景：`#0a0a0a`（深黑）
- 时间轴背景：`#111111`
- 时间轴文字：`#4a4a4a`
- Focus Block：`#f5a623`（琥珀）- 高饱和度
- Break Block：`#3a5a4a`（暗绿）- 低饱和度
- Transition Block：`#5a4a6a`（暗紫）- 过渡色
- 当前时间线：`#f5a623`（琥珀色发光线）
- 当前 Block 边框：`#f5a623/50`

**字体：**
- 时间数字：Orbitron（等宽电子感）
- 标签文字：Noto Sans JP
- 字号：
  - 时间轴小时：12px
  - Block 标签：14px
  - Week View 日期：11px

**间距：**
- 时间块高度：1小时 = 60px
- Block 内边距：8px
- 无间隙连续渲染

### 组件规格

#### 1. Time Axis（时间轴）
- 显示 06:00 - 24:00（可滚动）
- 每小时一个刻度
- 大字体显示整点时间
- 辅助刻度线显示半点

#### 2. Rhythm Block（节奏块）

**Focus Block:**
- 背景：琥珀色 `#f5a623`
- 文字：深色 `#0a0a0a`
- 圆角：4px
- 状态：稳定、坚实
- 动效：subtle zoom-in（进入）、fade + glow（退出）

**Break Block:**
- 背景：`#3a5a4a` 透明度 40%
- 文字：`#9a9a9a`
- 圆角：4px
- 状态：呼吸动画（opacity 0.3-0.5 循环）
- 动效：soft blur + calm tone（进入）

**Transition Block:**
- 背景：渐变 `#5a4a6a` → 透明
- 高度：较短（5-15分钟）
- 状态：闪动/渐变过渡

#### 3. Day View（默认主界面）
- 今日完整时间流（06:00-24:00）
- 自动滚动到当前时间
- 当前 block 高亮（边框发光 + 轻微放大）
- 当前时间线（红色/琥珀色发光横线）

#### 4. Week View（辅助视图）
- 7列（周一到周日）
- 每天显示为 rhythm density 条
- 高度：每天 80px
- 显示 focus/break 比例（颜色块堆叠）
- 今日列高亮
- 无细节，只显示密度

#### 5. View Switcher
- 两个按钮：Day / Week
- 当前视图高亮
- 极简样式：无边框，仅文字

### 动效规格

**Focus Start:**
- 动画：scale(0.98) → scale(1)
- 时长：0.3s
- 缓动：easeOut

**Focus End:**
- 动画：opacity 1 → 0.5 + 边缘发光
- 时长：0.5s

**Break Start:**
- 动画：blur(0px) → blur(2px) + 透明度变化
- 时长：0.8s
- 缓动：easeInOut

**Break End:**
- 动画：snap 回 focus 状态
- 时长：0.2s

**当前时间线：**
- 持续发光脉冲
- 2px 高度横线

## 3. 功能规格

### 模拟数据
预设今日节奏块：
```
06:00-06:30  起床/过渡 (transition)
06:30-08:00  早间准备 (break)
08:00-12:00  上午工作 (focus)
12:00-13:00  午休 (break)
13:00-17:00  下午工作 (focus)
17:00-18:00  傍晚过渡 (transition)
18:00-22:00  晚间时光 (break)
22:00-24:00  睡前过渡 (transition)
```

### 用户交互
- 滚动查看时间流
- 点击切换 Day/Week 视图
- 无拖拽/编辑（首版保持极简）

### 边界情况
- 非工作时间显示为空白/过渡色
- 周末使用不同的模拟数据

## 4. 验收标准

### 视觉检查点
- [ ] 时间轴在左侧，清晰显示整点
- [ ] Block 之间无断裂，100% 时间覆盖
- [ ] Focus/Break/Transition 有明显视觉区分
- [ ] 当前时间线可见
- [ ] 当前 block 高亮

### 功能检查点
- [ ] 页面加载默认 Day View
- [ ] 自动滚动到当前时间
- [ ] Week View 正确显示 7 天密度
- [ ] Day/Week 切换正常

### 动效检查点
- [ ] Block 有流畅的进入/退出动画
- [ ] Break 有呼吸效果
- [ ] 视图切换有过渡动画
