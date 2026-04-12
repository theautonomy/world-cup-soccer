# Mode: group — 小组赛数据

读取 `data/groups.json` 和该组四支球队的 JSON，生成小组页面数据摘要。

## 调用方式

```
/world-cup group A
/world-cup group H
```

---

## 工作流

1. 解析字母（大写）
2. 读取 `data/groups.json` → 获取该组四支球队的 slug 列表
3. 读取每支球队的 `data/teams/{slug}.json`
4. 输出该组概况：
   - 各队 FIFA 排名、世界杯头衔数、参赛次数
   - 基于 FIFA 排名的晋级预测（前两名）
   - 值得关注的潜在对决

## 如果某支球队 JSON 不存在

提示用户先运行 `/world-cup team {name}` 生成该队数据，然后再查看小组页面。

## 输出

React 应用会自动渲染 `/groups/{letter}` 页面，读取现有数据。
本模式主要用于命令行摘要输出，不需要生成额外文件。
