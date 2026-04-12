# Mode: team — 球队数据采集器

为指定球队研究并生成一个结构化 JSON 数据文件。React app 负责渲染；本模式只负责数据。

**首次运行**（JSON不存在）→ 完整研究 + 生成 JSON  
**再次运行**（JSON已存在）→ 读取现有JSON，研究改进点，就地更新  
**强制重建**：`/world-cup team Brazil --new` → 忽略现有文件，完整重新采集

## 调用方式

```
/world-cup team Brazil
/world-cup team 法国
/world-cup team Germany --new
```

## 工作流判断

```
检查 data/teams/{slug}.json 是否存在
  ├─ 不存在 → 完整研究 → 生成 JSON
  └─ 存在   → 读取现有JSON → 识别改进点 → 定向补充研究 → 更新JSON
              除非传入 --new → 完整重新采集
```

---

## 推荐信息来源

| 类别 | 推荐站点 |
|------|---------|
| **国家基本信息** | `en.wikipedia.org` · `cia.gov/the-world-factbook` · `worldometers.info` |
| **FIFA排名 & 联合会** | `fifa.com` · `uefa.com` · `conmebol.com` · `concacaf.com` |
| **世界杯历史** | `fifa.com/worldcup` · `en.wikipedia.org` · `rsssf.com` · `11v11.com` |
| **球员数据 & 阵容** | `transfermarkt.com` · `fbref.com` · `sofifa.com` · `soccerway.com` |
| **新闻 & 深度报道** | `bbc.com/sport/football` · `espn.com/soccer` · `goal.com` · `theguardian.com/football` |
| **统计 & 历史档案** | `transfermarkt.com` · `fbref.com` · `worldfootball.net` |
| **中文来源（可选）** | `zh.wikipedia.org` · `zhihu.com` · `sohu.com/sports` · `sina.com.cn/sports` |

**搜索策略：**
- 英文查数据（FIFA排名、出场数、世界杯成绩）→ 更准确
- 中文查叙事（足球文化、历史故事）→ 更自然流畅
- Wikipedia + FIFA.com 作为事实核查基准
- transfermarkt.com 是球员数据最权威来源

---

## 研究清单

### 1. 国家基本信息
- 国家全名（中英文）、首都、人口、官方语言
- 国旗颜色（用于配色）、所在大洲、货币、国歌

### 2. 足球联合会
- 联合会缩写（CBF、DFB 等）
- 当前 FIFA 排名
- 2026 世界杯分组（A–L），参考 `data/groups.json` 或搜索 "FIFA World Cup 2026 draw groups"

### 3. 世界杯历史
- 总参赛次数、冠军次数及年份、最佳成绩
- **历届完整战绩**（每届年份、举办国、成绩、备注）

### 4. 2026 世界杯阵容
- 主教练（中英文姓名、国籍）
- 球员列表：中文姓名、英文姓名、位置（GK/DEF/MID/FWD）、效力俱乐部、国家队出场数

### 5. 历史传奇球员（5人）
- 中英文姓名、效力年代、司职位置、中英文简介（2-3句）、关键数据

### 6. 经典宿敌（2-3个）
- 对手中英文名、中英文描述（2-3句）

### 7. 趣味数据（3-5条）
- emoji + 中英文描述

---

## JSON Schema

输出到 `data/teams/{slug}.json`：

```json
{
  "meta": {
    "slug": "brazil",
    "generated": "2026-04-12",
    "version": 1
  },
  "team": {
    "name_zh": "巴西",
    "name_en": "Brazil",
    "flag_emoji": "🇧🇷",
    "federation": "CBF",
    "fifa_rank": 1,
    "group": "H",
    "colors": {
      "primary": "#009C3B",
      "secondary": "#FFDF00",
      "accent": "#002776"
    }
  },
  "country": {
    "name_zh": "巴西",
    "name_en": "Brazil",
    "capital": "Brasília",
    "population_zh": "2.15亿",
    "population_en": "215 million",
    "area": "8.51M km²",
    "language_zh": "葡萄牙语",
    "language_en": "Portuguese",
    "continent_zh": "南美洲",
    "continent_en": "South America",
    "currency_zh": "巴西雷亚尔",
    "currency_en": "Brazilian Real",
    "anthem_zh": "巴西国歌",
    "anthem_en": "Hino Nacional Brasileiro",
    "desc_zh": "巴西是南美洲最大的国家...",
    "desc_en": "Brazil is the largest country in South America...",
    "football_desc_zh": "足球在巴西不仅仅是运动...",
    "football_desc_en": "Football in Brazil is more than a sport..."
  },
  "world_cup": {
    "titles": 5,
    "appearances": 22,
    "best_result_zh": "冠军",
    "best_result_en": "Champions",
    "title_years": [1958, 1962, 1970, 1994, 2002],
    "history": [
      {
        "year": 2022,
        "host_zh": "卡塔尔",
        "host_en": "Qatar",
        "result_zh": "八强",
        "result_en": "Quarter-final",
        "note_zh": "点球负于克罗地亚",
        "note_en": "Lost to Croatia on penalties",
        "row_class": "quarterfinal"
      }
    ]
  },
  "squad_2026": {
    "coach": {
      "name_zh": "多里瓦尔",
      "name_en": "Dorival Júnior",
      "nationality_zh": "巴西",
      "nationality_en": "Brazilian"
    },
    "players": [
      {
        "name_zh": "阿利松",
        "name_en": "Alisson Becker",
        "position": "GK",
        "club": "Liverpool",
        "caps": 80
      }
    ]
  },
  "legends": [
    {
      "number": 1,
      "name_zh": "贝利",
      "name_en": "Pelé",
      "years": "1957–1971",
      "position_zh": "前锋",
      "position_en": "Forward",
      "bio_zh": "球王贝利是足球史上最伟大的球员...",
      "bio_en": "Pelé is widely regarded as the greatest footballer...",
      "stat_value": "77",
      "stat_zh": "国家队进球",
      "stat_en": "international goals"
    }
  ],
  "rivalries": [
    {
      "opponent_zh": "阿根廷",
      "opponent_en": "Argentina",
      "desc_zh": "南美德比，世界足坛最激烈的宿敌之争...",
      "desc_en": "The South American Derby, one of football's greatest rivalries..."
    }
  ],
  "fun_facts": [
    {
      "icon": "🏆",
      "text_zh": "巴西是唯一参加过每一届世界杯的国家",
      "text_en": "Brazil is the only nation to have participated in every FIFA World Cup"
    }
  ]
}
```

### row_class 取值
`champion` · `runner-up` · `semifinal` · `quarterfinal` · `round-of-16` · `group` · `did-not-qualify`

---

## 输出步骤

1. 确定 slug（英文名小写，空格→连字符）
2. 检查 `data/teams/{slug}.json` 是否存在
   - **不存在** → 执行完整研究 → 写入 JSON
   - **存在** → 读取 → 评估质量 → 定向补充 → 用 Edit 工具更新字段 → 更新 `meta.generated`
3. 验证 JSON 格式合法（所有必填字段存在）
4. 报告：新建 or 更新了哪些字段，输出路径
