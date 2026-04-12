# Mode: team — 球队主页生成器

为指定球队生成一个精美的简体中文HTML页面，包含国家信息、足球历史、世界杯战绩、著名球员等内容。

## 调用方式

```
/world-cup team Brazil
/world-cup team 巴西
/world-cup team France
```

## 推荐信息来源（Recommended Sources）

以下为各类信息的推荐搜索站点，不限于此列表——根据实际搜索结果灵活选择最权威、最新的来源。

| 类别 | 推荐站点 |
|------|---------|
| **国家基本信息** | `en.wikipedia.org` · `cia.gov/the-world-factbook` · `worldometers.info` |
| **FIFA排名 & 联合会** | `fifa.com` · `uefa.com` · `conmebol.com` · `concacaf.com` |
| **世界杯历史** | `fifa.com/worldcup` · `en.wikipedia.org` · `rsssf.com` · `11v11.com` |
| **球员数据 & 阵容** | `transfermarkt.com` · `fbref.com` · `sofifa.com` · `soccerway.com` |
| **新闻 & 深度报道** | `bbc.com/sport/football` · `espn.com/soccer` · `goal.com` · `theguardian.com/football` |
| **统计 & 历史档案** | `transfermarkt.com` · `fbref.com` · `worldfootball.net` · `soccerstats.com` |
| **中文来源（可选）** | `zh.wikipedia.org` · `zhihu.com` · `sohu.com/sports` · `sina.com.cn/sports` |

**搜索策略：**
- 用英文查询技术数据（FIFA排名、球员出场数、世界杯成绩）——数据更准确
- 用中文查询叙述性内容（足球文化、历史故事）——中文描述更自然流畅
- 优先 Wikipedia + FIFA.com 作为事实核查基准
- transfermarkt.com 是球员数据和转会信息的最权威来源
- fbref.com 提供最详细的比赛统计数据

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

1. 确定输出路径：`output/teams/{slug}.html`
   - slug = 球队英文名小写，空格替换为连字符（如 `brazil.html`、`south-korea.html`）
2. **如果文件已存在，先删除**：`Bash: rm -f output/teams/{slug}.html`
3. 读取 `templates/team-template.html`
4. 将所有 `{{PLACEHOLDER}}` 替换为研究阶段收集的内容
5. 根据球队颜色设置 CSS 变量
6. 将完整HTML写入 `output/teams/{slug}.html`
7. 报告输出路径

## Placeholder 对照表

每个动态文本内容都有中文（ZH）和英文（EN）两个版本。页面通过 CSS + JS 切换显示。

| Placeholder | 内容 |
|-------------|------|
| `{{TEAM_NAME_ZH}}` | 球队中文名（如：巴西）|
| `{{TEAM_NAME_EN}}` | 球队英文名（如：Brazil）|
| `{{TEAM_FLAG_EMOJI}}` | 国旗 emoji（如：🇧🇷）|
| `{{COUNTRY_ZH}}` | 国家中文名 |
| `{{COUNTRY_EN}}` | 国家英文名 |
| `{{FIFA_RANK}}` | 当前FIFA排名数字 |
| `{{TITLES}}` | 世界杯冠军次数 |
| `{{APPEARANCES}}` | 世界杯总参赛次数 |
| `{{BEST_RESULT}}` | 最佳成绩中文（如：冠军）|
| `{{BEST_RESULT_EN}}` | 最佳成绩英文（如：Champions）|
| `{{FEDERATION}}` | 联合会缩写（如：CBF）|
| `{{COACH_NAME}}` | 主教练中文姓名 |
| `{{COACH_NAME_EN}}` | 主教练英文姓名 |
| `{{COACH_NATIONALITY_ZH}}` | 主教练国籍（中文）|
| `{{COACH_NATIONALITY_EN}}` | 主教练国籍（英文）|
| `{{COLOR_PRIMARY}}` | 主色 hex |
| `{{COLOR_SECONDARY}}` | 辅色 hex |
| `{{COLOR_ACCENT}}` | 强调色 hex |
| `{{COUNTRY_CAPITAL}}` | 首都（通用，中英相同或英文）|
| `{{COUNTRY_POPULATION}}` | 人口（如：215 million / 2.15亿）|
| `{{COUNTRY_AREA}}` | 国土面积（如：8.51M km²）|
| `{{COUNTRY_LANGUAGE_ZH}}` | 官方语言（中文）|
| `{{COUNTRY_LANGUAGE_EN}}` | 官方语言（英文）|
| `{{COUNTRY_CONTINENT_ZH}}` | 所在大洲（中文，如：南美洲）|
| `{{COUNTRY_CONTINENT_EN}}` | 所在大洲（英文，如：South America）|
| `{{COUNTRY_CURRENCY_ZH}}` | 货币（中文，如：巴西雷亚尔）|
| `{{COUNTRY_CURRENCY_EN}}` | 货币（英文，如：Brazilian Real）|
| `{{COUNTRY_ANTHEM_ZH}}` | 国歌名称（中文译名）|
| `{{COUNTRY_ANTHEM_EN}}` | 国歌名称（英文）|
| `{{COUNTRY_DESC}}` | 国家简介（中文，2-3句）|
| `{{COUNTRY_DESC_EN}}` | 国家简介（英文，2-3句）|
| `{{COUNTRY_FOOTBALL_DESC}}` | 足球文化（中文，2-3句）|
| `{{COUNTRY_FOOTBALL_DESC_EN}}` | 足球文化（英文，2-3句）|
| `{{WC_HISTORY_ROWS}}` | 世界杯历届成绩HTML行（含双语备注）|
| `{{SQUAD_CARDS}}` | 2026阵容球员卡片HTML |
| `{{LEGEND_CARDS}}` | 历史传奇球员卡片HTML（含双语简介）|
| `{{RIVALRY_CARDS}}` | 经典对手卡片HTML（含双语描述）|
| `{{FUN_FACTS}}` | 趣味数据列表HTML（含双语内容）|
| `{{TITLES_YEARS}}` | 夺冠年份 HTML spans |
| `{{LAST_UPDATED}}` | 生成日期（YYYY-MM-DD）|

## 阵容卡片 HTML 格式

位置缩写通用（中英相同）：GK（门将）, DEF（后卫）, MID（中场）, FWD（前锋）

```html
<div class="player-card">
  <div class="player-pos">{GK|DEF|MID|FWD}</div>
  <div class="player-name zh">{中文姓名}</div>
  <div class="player-name en">{英文姓名}</div>
  <div class="player-name-en">{英文姓名拼写}</div>
  <div class="player-club">{效力俱乐部}</div>
  <div class="player-caps zh">{出场数} 场</div>
  <div class="player-caps en">{出场数} caps</div>
</div>
```

## 传奇球员卡片 HTML 格式

```html
<div class="legend-card">
  <div class="legend-number">{序号}</div>
  <div class="legend-name zh">{中文姓名}</div>
  <div class="legend-name en">{英文姓名}</div>
  <div class="legend-name-sub zh">{英文姓名}</div>
  <div class="legend-name-sub en">{中文姓名}</div>
  <div class="legend-years">{效力年代，如 1958–1970}</div>
  <div class="legend-position zh">{司职位置中文}</div>
  <div class="legend-position en">{司职位置英文}</div>
  <div class="legend-bio zh">{2-3句中文简介，突出世界杯成就}</div>
  <div class="legend-bio en">{2-3句英文简介，突出世界杯成就}</div>
  <div class="legend-stat">
    <span>{关键数据}</span>
    <span class="zh">{中文说明}</span>
    <span class="en">{英文说明}</span>
  </div>
</div>
```

## 经典对手卡片 HTML 格式

```html
<div class="rivalry-card">
  <div class="rivalry-teams">
    <span class="zh">{{TEAM_NAME_ZH}}</span>
    <span class="en">{{TEAM_NAME_EN}}</span>
    <span class="rivalry-vs">vs</span>
    {对手中英文名}
  </div>
  <div class="rivalry-desc zh">{中文描述，2-3句}</div>
  <div class="rivalry-desc en">{英文描述，2-3句}</div>
</div>
```

## 趣味数据 HTML 格式

```html
<div class="fact-item">
  <div class="fact-icon">{emoji}</div>
  <div class="fact-text zh">{中文趣味数据}</div>
  <div class="fact-text en">{英文趣味数据}</div>
</div>
```

## 世界杯历届成绩 HTML 格式

备注列需同时包含中英文：

```html
<tr class="{champion|runner-up|semifinal|quarterfinal|group|highlight}">
  <td>{年份}</td>
  <td>{举办国}</td>
  <td><span class="result-badge result-{champion|runner-up|semifinal|other}">
    <span class="zh">{成绩中文}</span>
    <span class="en">{成绩英文}</span>
  </span></td>
  <td>
    <span class="zh">{备注中文，如：首夺冠军}</span>
    <span class="en">{备注英文，如：First title}</span>
  </td>
</tr>
```

## 输出规范

- 单个自包含HTML文件（无外部依赖除Google Fonts）
- 文件大小目标：< 200KB
- 必须在现代浏览器直接双击打开即可使用
- 响应式：桌面端和移动端均可正常显示
