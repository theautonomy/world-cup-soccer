# Mode: team — 球队主页生成器

为指定球队生成一个精美的简体中文HTML页面，包含国家信息、足球历史、世界杯战绩、著名球员等内容。

## 调用方式

```
/world-cup team Brazil
/world-cup team 巴西
/world-cup team France
```

## 研究阶段（Research Phase）

使用 WebSearch + WebFetch 收集以下信息：

### 1. 国家基本信息
- 国家全名（中文）、首都、人口、官方语言
- 国旗颜色（用于页面配色）
- 地理位置、大洲

### 2. 足球联合会
- 联合会名称与缩写（如 CBF、DFB）
- 成立年份
- 当前FIFA排名
- 主场球场

### 3. 世界杯历史
- 总参赛次数
- 冠军次数及年份
- 历届世界杯成绩（每届进几强）
- 最佳成绩
- 作为东道主的历史（如有）
- 标志性时刻（进球、胜利、失利）

### 4. 2026世界杯阵容
- 主教练姓名、国籍、执教风格
- 确认参赛球员（门将、后卫、中场、前锋各3-4人）
- 每名球员：中文姓名、效力俱乐部、位置、国家队出场数

### 5. 历史传奇球员
- 5名最具代表性的历史名将
- 每人：中文姓名、司职位置、效力年代、代表成就、世界杯数据

### 6. 经典对手与rivalries
- 2-3个最著名的竞争对手
- 简要描述rivalry历史

### 7. 趣味数据
- 3-5条有趣的队史数据或冷知识

## 配色提取

根据球队主客场球衣颜色确定：
- `--color-primary`: 主色（主场球衣主色）
- `--color-secondary`: 辅色（主场球衣辅色或客场主色）
- `--color-accent`: 强调色（用于高亮、标签、按钮）

示例：
- 巴西：primary=#009C3B, secondary=#FFDF00, accent=#002776
- 法国：primary=#002395, secondary=#ED2939, accent=#FFFFFF
- 德国：primary=#000000, secondary=#DD0000, accent=#FFCE00
- 阿根廷：primary=#74ACDF, secondary=#FFFFFF, accent=#74ACDF
- 英格兰：primary=#FFFFFF, secondary=#CF081F, accent=#00247D

## 生成阶段（Generation Phase）

1. 读取 `templates/team-template.html`
2. 将所有 `{{PLACEHOLDER}}` 替换为研究阶段收集的内容
3. 根据球队颜色设置 CSS 变量
4. 将完整HTML写入 `output/teams/{slug}.html`
   - slug = 球队英文名小写，空格替换为连字符（如 `brazil.html`、`south-korea.html`）
5. 报告输出路径

## Placeholder 对照表

| Placeholder | 内容 |
|-------------|------|
| `{{TEAM_NAME_ZH}}` | 球队中文名（如：巴西）|
| `{{TEAM_NAME_EN}}` | 球队英文名（如：Brazil）|
| `{{COUNTRY_ZH}}` | 国家中文名 |
| `{{FIFA_RANK}}` | 当前FIFA排名数字 |
| `{{TITLES}}` | 世界杯冠军次数 |
| `{{APPEARANCES}}` | 世界杯总参赛次数 |
| `{{BEST_RESULT}}` | 最佳成绩（如：冠军、亚军、第三名）|
| `{{FEDERATION}}` | 联合会缩写（如：CBF）|
| `{{COACH_NAME}}` | 主教练中文姓名 |
| `{{COACH_NATIONALITY}}` | 主教练国籍 |
| `{{COLOR_PRIMARY}}` | 主色 hex |
| `{{COLOR_SECONDARY}}` | 辅色 hex |
| `{{COLOR_ACCENT}}` | 强调色 hex |
| `{{COUNTRY_CAPITAL}}` | 首都（中文）|
| `{{COUNTRY_POPULATION}}` | 人口（如：2.15亿）|
| `{{COUNTRY_AREA}}` | 国土面积（如：851.6万平方公里）|
| `{{COUNTRY_LANGUAGE}}` | 官方语言（中文）|
| `{{COUNTRY_CONTINENT}}` | 所在大洲（中文）|
| `{{COUNTRY_CURRENCY}}` | 货币名称（中文）|
| `{{COUNTRY_ANTHEM}}` | 国歌名称（中文）|
| `{{COUNTRY_DESC}}` | 2-3句国家简介，突出地理与文化特色 |
| `{{COUNTRY_FOOTBALL_DESC}}` | 2-3句足球文化描述，足球在该国的地位与影响 |
| `{{WC_HISTORY_ROWS}}` | 世界杯历届成绩HTML行 |
| `{{SQUAD_CARDS}}` | 2026阵容球员卡片HTML |
| `{{LEGEND_CARDS}}` | 历史传奇球员卡片HTML |
| `{{RIVALRY_CARDS}}` | 经典对手卡片HTML |
| `{{FUN_FACTS}}` | 趣味数据列表HTML |
| `{{TITLES_YEARS}}` | 夺冠年份（如：1958、1962、1970、1994、2002）|
| `{{LAST_UPDATED}}` | 生成日期 |

## 阵容卡片 HTML 格式

```html
<div class="player-card">
  <div class="player-pos">{位置缩写}</div>
  <div class="player-name">{中文姓名}</div>
  <div class="player-name-en">{英文姓名}</div>
  <div class="player-club">{效力俱乐部}</div>
  <div class="player-caps">{出场数} 场</div>
</div>
```

位置缩写：门将=GK，后卫=DEF，中场=MID，前锋=FWD

## 传奇球员卡片 HTML 格式

```html
<div class="legend-card">
  <div class="legend-number">{球衣号码或序号}</div>
  <div class="legend-name">{中文姓名}</div>
  <div class="legend-name-en">{英文姓名}</div>
  <div class="legend-years">{效力年代，如 1958–1970}</div>
  <div class="legend-position">{司职位置}</div>
  <div class="legend-bio">{2-3句简介，突出世界杯成就}</div>
  <div class="legend-stat"><span>{关键数据}</span> {说明}</div>
</div>
```

## 世界杯历届成绩 HTML 格式

```html
<tr class="{champion|runner-up|semifinal|quarterfinalf|group|highlight}">
  <td>{年份}</td>
  <td>{举办国}</td>
  <td>{成绩}</td>
  <td>{备注，如：首夺冠军}</td>
</tr>
```

## 输出规范

- 单个自包含HTML文件（无外部依赖除Google Fonts）
- 文件大小目标：< 200KB
- 必须在现代浏览器直接双击打开即可使用
- 响应式：桌面端和移动端均可正常显示
