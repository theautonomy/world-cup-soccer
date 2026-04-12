# Mode: audit — JSON 数据审计

运行 `audit.mjs` 脚本，识别需要修复或完善的 team JSON 文件，并给出具体行动建议。

## 调用方式

```
/world-cup audit              审计所有球队
/world-cup audit Brazil       审计单支球队
```

---

## 执行步骤

1. 运行脚本，获取审计报告：

   ```bash
   # 所有球队
   node audit.mjs

   # 单支球队
   node audit.mjs {slug}
   ```

2. 解读结果，给用户呈现摘要：
   - ❌ **Errors** — 必须修复（无效 JSON、缺少必填字段、花引号等）
   - ⚠️  **Warnings** — 建议完善（阵容不足、叙述文字过短、传奇球员介绍简略等）
   - ✅ **Clean** — 无问题

3. 针对每个有问题的文件，给出具体建议：
   - **无效 JSON** → 用 Edit 工具修复语法错误（常见：花引号 `"` `"` 替换为 `「」`）
   - **缺少必填字段** → 提示用户运行 `/world-cup refine {team}` 补充数据
   - **阵容不足 / 叙述过短** → 提示用户运行 `/world-cup refine {team}` 做定向补充研究
   - **slug 与文件名不符** → 用 Edit 工具修正 `meta.slug`

4. 如果用户要求，可以直接修复 JSON 语法错误（花引号、多余逗号等）；内容类问题需要 refine 模式补充研究。

---

## 评分说明

| 分数 | 含义 |
|------|------|
| 100 | 完全通过，无任何问题 |
| 80–99 | 有警告，内容可进一步完善 |
| 60–79 | 多项警告，建议 refine |
| < 60 | 有错误或严重缺失，需要修复 |

---

## 常见问题与修复

| 问题 | 原因 | 修复方式 |
|------|------|----------|
| `Invalid JSON` | 花引号 `"` `"` 在 JSON 中非法 | 替换为 `「」` 或直接删除 |
| `Missing field: squad_2026.players` | 球员数据未采集 | `/world-cup refine {team}` |
| `Only 2 legends` | 传奇球员不足3人 | `/world-cup refine {team}` |
| `Thin text in country.desc_zh` | 国家描述过短 | `/world-cup refine {team}` |
| `No GK in squad` | 门将数据缺失 | `/world-cup refine {team}` |
