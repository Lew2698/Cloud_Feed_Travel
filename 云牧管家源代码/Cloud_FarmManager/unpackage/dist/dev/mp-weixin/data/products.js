"use strict";
const productsData = {
  1: {
    // 基本信息
    id: 1,
    name: "瑶族野生鸡蛋 500g",
    slogan: "采自瑶山深处鸡所下的蛋，天然无添加",
    price: "12",
    originalPrice: "15",
    isNew: true,
    isOrganic: true,
    rating: "4.9",
    sales: "586",
    favorableRate: 98,
    images: [
      "/static/static2/hCSyEZ4ptM_small.jpg",
      "/static/static2/UWwPfXP2yh_small.jpg",
      "/static/static2/8380.jpg_wh860.jpg",
      "/static/static2/yuan_af14c2ee4fda89819c3cd58a234b8b68.jpeg"
    ],
    description: [
      "瑶族鸡蛋源自瑶族聚居的青山秀水间，瑶族同胞们在山林间散养当地特色土鸡。土鸡们自由穿梭于林间草地，啄食山间昆虫、草籽，饮用清冽山泉水。这些土鸡在天然生态环境中生长，所产鸡蛋完全遵循自然规律孕育。瑶族鸡蛋无激素、抗生素添加，外壳色泽温润，蛋黄紧实饱满、颜色橙红，富含蛋白质、多种维生素及矿物质等营养物质，以天然本真的品质，传递着瑶族聚居地独特的生态之美与自然馈赠 。",
      "瑶族鸡蛋外壳泛着柔和的浅褐色光泽，个头匀称饱满。蛋黄颜色鲜艳橙红，质地紧实，蛋清浓稠透亮。轻轻煮熟后，剥开蛋壳，浓郁的蛋香便扑鼻而来，入口细腻绵密，口感醇香浓郁，余味中带着淡淡的自然清甜。其富含优质蛋白质、卵磷脂、钙、铁等多种人体所需营养元素，无论是自家烹饪滋养，还是作为伴手礼馈赠亲友，都是充满瑶族特色与健康心意的优质之选。"
    ],
    farmId: 1,
    farmName: "瑶山养鸡合作社",
    farmLogo: "/static/static2/4378.jpg_wh860.jpg",
    farmLocation: "湘西瑶族自治县",
    specs: [
      { label: "品名", value: "瑶山野生鸡蛋" },
      { label: "净含量", value: "500g" },
      { label: "产地", value: "湘西瑶族自治县" },
      { label: "保质期", value: "20天" },
      { label: "储存方法", value: "常温密封保存，避免阳光直射" },
      { label: "认证", value: "有机认证、绿色食品认证" }
    ],
    detailImages: [
      "/static/static2/90.jpg",
      "/static/static2/215116ec82444d536ffc9db9894bd298.jpg",
      "https://img95.699pic.com/photo/50165/8380.jpg_wh860.jpg",
      "https://pic.52112.com/180606/JPG-180606_129/UWwPfXP2yh_small.jpg",
      "https://img95.699pic.com/photo/60014/8614.jpg_wh300.jpg!/fh/300/quality/90",
      "https://bpic.588ku.com/element_origin_min_pic/19/07/19/215116ec82444d536ffc9db9894bd298.jpg"
    ],
    comments: [
      {
        username: "张*红",
        avatar: "/static/static2/photo-1494790108377-be9c29b29330.avif",
        date: "2025-04-15",
        rating: 5,
        content: "收到瑶族鸡蛋超惊喜！包装严实又精致，防震设计让每一颗鸡蛋都完好无损。打开包装，就能感受到天然的气息，鸡蛋外壳带着山林间的质朴质感。煮熟后品尝，蛋香浓郁醇厚，口感细腻嫩滑，完全没有腥味。卖家介绍说这是瑶族同胞山林散养土鸡所产，无激素添加，吃得安心又健康，下次还会回购！",
        images: [
          "https://img95.699pic.com/photo/60082/7816.jpg_wh860.jpg",
          "https://pic.nximg.cn/file/20210520/21319742_210119474127_2.jpg"
        ]
      },
      {
        username: "王*生",
        avatar: "/static/static2/photo-1599566150163-29194dcaad36.avif",
        date: "2025-04-10",
        rating: 5,
        content: "第二次购买了，家里人都很喜欢。这个瑶山鸡蛋确实和超市里的不一样，有一种特别的香味，质量很好，而且通过App还可以查看鸡蛋的溯源信息，非常安心。"
      }
    ],
    // 区块链溯源信息
    traceInfo: {
      productName: "瑶山散养鸡",
      productImage: "/static/static2/3545.jpg_wh860.jpg",
      traceId: "YSCK-A5831-2025",
      blockHeight: "2,356,782",
      chainTime: "2025-03-15 14:32:15",
      hashValue: "0xf7c8d9e1b3a5c7f9e1d3b5a7c9e1d3b5a7c9e1d3b5a7c9",
      events: [
        {
          date: "2025-03-15 08:30:25",
          title: "完成出栏检测",
          description: "由瑶山生态养殖基地认证兽医完成健康检测，各项指标达标。",
          verified: true,
          data: {
            "体重": "2.3 kg",
            "健康评分": "96/100",
            "检测人": "李医师（证号: YS20250315）"
          }
        },
        {
          date: "2025-02-26 10:15:42",
          title: "完成疫苗接种",
          description: "完成第三次疫苗接种，增强免疫力。",
          verified: true,
          data: {
            "疫苗名称": "家禽流感预防疫苗",
            "批次号": "FLU20250226-07",
            "接种人": "王兽医（证号: YS20210532）"
          }
        },
        {
          date: "2025-01-10 16:22:08",
          title: "饲料更换记录",
          description: "根据生长阶段需求，更换为有机谷物混合饲料。",
          verified: false,
          data: {
            "饲料名称": "有机谷物混合饲料",
            "供应商": "瑶山有机农场",
            "成分": "有机玉米、小麦、大豆（无抗生素）"
          }
        },
        {
          date: "2024-12-05 09:48:36",
          title: "孵化记录",
          description: "家禽育雏中心成功孵化，纳入养殖计划。",
          verified: true,
          data: {
            "品种": "瑶山本地黑羽鸡",
            "批次号": "YS-CHK-2024-12-1257",
            "孵化中心": "瑶山生态家禽孵化中心"
          }
        }
      ]
    }
  },
  2: {
    // 基本信息
    id: 2,
    name: "香芋 250g",
    slogan: "瑶山高海拔种植，口感香甜软糯",
    price: "6",
    originalPrice: "8",
    isNew: false,
    isOrganic: true,
    rating: "4.8",
    sales: "412",
    favorableRate: 96,
    images: [
      "/static/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg",
      "/static/static2/90 (1).jpg",
      "/static/static2/3944.jpg_wh860.jpg"
    ],
    description: [
      "瑶山香芋生长在海拔800米以上的高山梯田中，得益于瑶族地区独特的气候条件和肥沃的红土壤。香芋在充足的阳光和清洁的山泉水滋润下，历经6个月的自然生长周期。",
      "香芋外皮呈淡褐色，肉质洁白细腻，口感香甜软糯，富含淀粉、蛋白质、维生素C等营养成分。无论是蒸煮、炖汤还是制作甜品，都能展现其独特的香甜风味。"
    ],
    farmId: 2,
    farmName: "瑶山农业合作社",
    farmLogo: "/static/static2/4378.jpg_wh860.jpg",
    farmLocation: "广西瑶族自治区",
    specs: [
      { label: "品名", value: "瑶山香芋" },
      { label: "净含量", value: "250g" },
      { label: "产地", value: "广西瑶族自治区" },
      { label: "保质期", value: "30天" },
      { label: "储存方法", value: "阴凉干燥处保存" },
      { label: "认证", value: "有机认证" }
    ],
    detailImages: [
      "/static/static2/90 (1).jpg",
      "/static/static2/3944.jpg_wh860.jpg"
    ],
    comments: [
      {
        username: "李*华",
        avatar: "/static/static2/photo-1494790108377-be9c29b29330.avif",
        date: "2025-04-12",
        rating: 5,
        content: "香芋质量很好，口感香甜，孩子很喜欢吃。"
      }
    ],
    // 区块链溯源信息
    traceInfo: {
      productName: "瑶山香芋",
      productImage: "/static/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg",
      traceId: "YSXY-B6742-2025",
      blockHeight: "2,358,901",
      chainTime: "2025-03-20 10:15:30",
      hashValue: "0xa8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2",
      events: [
        {
          date: "2025-03-20 09:00:00",
          title: "收获完成",
          description: "香芋达到最佳成熟度，完成人工采收。",
          verified: true,
          data: {
            "重量": "250g",
            "品质等级": "A级",
            "收获人": "陈农户（证号: YS20250320）"
          }
        },
        {
          date: "2025-01-15 14:30:00",
          title: "施肥记录",
          description: "使用有机肥料进行追肥，促进香芋生长。",
          verified: true,
          data: {
            "肥料类型": "有机复合肥",
            "用量": "50kg/亩",
            "施肥人": "张技术员（证号: YS20210815）"
          }
        },
        {
          date: "2024-09-20 08:00:00",
          title: "种植记录",
          description: "在高山梯田中种植香芋种苗。",
          verified: true,
          data: {
            "种植面积": "2亩",
            "种苗来源": "瑶山农业研究所",
            "种植人": "陈农户（证号: YS20240920）"
          }
        }
      ]
    }
  },
  3: {
    // 基本信息
    id: 3,
    name: "瑶绣",
    slogan: "传统手工艺，千年文化传承",
    price: "68",
    originalPrice: "88",
    isNew: false,
    isOrganic: false,
    rating: "4.7",
    sales: "356",
    favorableRate: 94,
    images: [
      "/static/static2/2121F888A69E6932BE26DF9029E_B6C725FA_128671.jpg",
      "/static/static2/4250555339_919020146.jpg"
    ],
    description: [
      "瑶绣是瑶族传统手工艺的瑰宝，历史悠久，工艺精湛。每一件瑶绣都是瑶族妇女用心血和智慧编织而成的艺术品。",
      "采用传统的丝线和棉线，运用独特的刺绣技法，图案多以花鸟、山水、几何纹样为主，色彩鲜艳，寓意吉祥。"
    ],
    farmId: 3,
    farmName: "瑶族手工艺合作社",
    farmLogo: "/static/static2/4378.jpg_wh860.jpg",
    farmLocation: "湖南瑶族自治州",
    specs: [
      { label: "品名", value: "瑶族传统刺绣" },
      { label: "尺寸", value: "30cm x 30cm" },
      { label: "材质", value: "纯棉布料+丝线" },
      { label: "工艺", value: "纯手工刺绣" },
      { label: "产地", value: "湖南瑶族自治州" },
      { label: "认证", value: "非物质文化遗产" }
    ],
    detailImages: [
      "/static/static2/4250555339_919020146.jpg"
    ],
    comments: [
      {
        username: "赵*美",
        avatar: "/static/static2/photo-1494790108377-be9c29b29330.avif",
        date: "2025-04-08",
        rating: 5,
        content: "刺绣工艺精美，图案寓意很好，值得收藏。"
      }
    ],
    // 区块链溯源信息
    traceInfo: {
      productName: "瑶族传统刺绣",
      productImage: "/static/static2/2121F888A69E6932BE26DF9029E_B6C725FA_128671.jpg",
      traceId: "YSXZ-C8953-2025",
      blockHeight: "2,360,124",
      chainTime: "2025-03-25 16:45:20",
      hashValue: "0xc9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
      events: [
        {
          date: "2025-03-25 15:30:00",
          title: "作品完成",
          description: "瑶族绣娘完成刺绣作品，经过质量检验合格。",
          verified: true,
          data: {
            "绣娘": "李阿婆（传承人证号: YS-FC-001）",
            "制作时长": "15天",
            "质量等级": "精品级"
          }
        },
        {
          date: "2025-03-10 09:00:00",
          title: "开始制作",
          description: "选用优质丝线和棉布，开始刺绣制作。",
          verified: true,
          data: {
            "图案设计": "传统花鸟纹样",
            "丝线来源": "瑶山丝绸厂",
            "布料来源": "瑶山纺织厂"
          }
        }
      ]
    }
  },
  4: {
    // 基本信息
    id: 4,
    name: "马蹄 500g",
    slogan: "清甜爽脆，天然无污染",
    price: "12",
    originalPrice: "15",
    isNew: false,
    isOrganic: true,
    rating: "4.9",
    sales: "289",
    favorableRate: 97,
    images: [
      "/static/static2/90 (1).jpg",
      "/static/static2/3944.jpg_wh860.jpg"
    ],
    description: [
      "瑶山马蹄生长在清澈的山泉水田中，水质纯净无污染。马蹄在天然的生态环境中生长，不使用任何化学农药和化肥。",
      "马蹄外皮呈深褐色，肉质洁白脆嫩，口感清甜爽脆，富含淀粉、蛋白质、维生素等营养成分，具有清热解毒的功效。"
    ],
    farmId: 4,
    farmName: "瑶山水产合作社",
    farmLogo: "/static/static2/4378.jpg_wh860.jpg",
    farmLocation: "云南瑶族自治县",
    specs: [
      { label: "品名", value: "瑶山马蹄" },
      { label: "净含量", value: "500g" },
      { label: "产地", value: "云南瑶族自治县" },
      { label: "保质期", value: "15天" },
      { label: "储存方法", value: "冷藏保存" },
      { label: "认证", value: "有机认证、绿色食品认证" }
    ],
    detailImages: [
      "/static/static2/90 (1).jpg"
    ],
    comments: [
      {
        username: "孙*强",
        avatar: "/static/static2/photo-1599566150163-29194dcaad36.avif",
        date: "2025-04-05",
        rating: 5,
        content: "马蹄很新鲜，口感脆嫩，甜度刚好。"
      }
    ],
    // 区块链溯源信息
    traceInfo: {
      productName: "瑶山马蹄",
      productImage: "/static/static2/90 (1).jpg",
      traceId: "YSMT-D1064-2025",
      blockHeight: "2,361,567",
      chainTime: "2025-03-28 11:20:15",
      hashValue: "0xd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
      events: [
        {
          date: "2025-03-28 10:00:00",
          title: "采收完成",
          description: "马蹄达到最佳采收期，完成人工采收。",
          verified: true,
          data: {
            "采收重量": "500g",
            "品质等级": "A+级",
            "采收人": "杨农户（证号: YS20250328）"
          }
        },
        {
          date: "2024-11-15 14:00:00",
          title: "种植记录",
          description: "在山泉水田中种植马蹄。",
          verified: true,
          data: {
            "种植面积": "1.5亩",
            "水源": "天然山泉水",
            "种植人": "杨农户（证号: YS20241115）"
          }
        }
      ]
    }
  },
  5: {
    // 基本信息
    id: 5,
    name: "瑶族传统刺绣手帕",
    slogan: "精美手工，文化传承",
    price: "58",
    originalPrice: "78",
    isNew: false,
    isOrganic: false,
    rating: "4.6",
    sales: "203",
    favorableRate: 92,
    images: [
      "/static/static2/4250555339_919020146.jpg",
      "/static/static2/2121F888A69E6932BE26DF9029E_B6C725FA_128671.jpg"
    ],
    description: [
      "瑶族传统刺绣手帕是瑶族文化的重要载体，每一条手帕都承载着深厚的文化内涵。",
      "采用传统的刺绣工艺，图案精美，色彩搭配和谐，既实用又具有收藏价值。"
    ],
    farmId: 5,
    farmName: "瑶族文化传承中心",
    farmLogo: "/static/static2/4378.jpg_wh860.jpg",
    farmLocation: "贵州瑶族自治州",
    specs: [
      { label: "品名", value: "瑶族刺绣手帕" },
      { label: "尺寸", value: "25cm x 25cm" },
      { label: "材质", value: "纯棉+丝线" },
      { label: "工艺", value: "纯手工刺绣" },
      { label: "产地", value: "贵州瑶族自治州" },
      { label: "认证", value: "文化遗产认证" }
    ],
    detailImages: [
      "/static/static2/4250555339_919020146.jpg"
    ],
    comments: [
      {
        username: "周*丽",
        avatar: "/static/static2/photo-1494790108377-be9c29b29330.avif",
        date: "2025-04-02",
        rating: 4,
        content: "手帕很精美，刺绣工艺不错，送人很合适。"
      }
    ],
    // 区块链溯源信息
    traceInfo: {
      productName: "瑶族刺绣手帕",
      productImage: "/static/static2/4250555339_919020146.jpg",
      traceId: "YSSP-E2175-2025",
      blockHeight: "2,362,890",
      chainTime: "2025-03-30 14:10:45",
      hashValue: "0xe1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
      events: [
        {
          date: "2025-03-30 13:00:00",
          title: "手帕完成",
          description: "瑶族绣娘完成手帕制作，通过质量检验。",
          verified: true,
          data: {
            "绣娘": "陈师傅（传承人证号: YS-FC-005）",
            "制作时长": "8天",
            "质量等级": "优质级"
          }
        },
        {
          date: "2025-03-22 10:00:00",
          title: "开始制作",
          description: "选用优质材料，开始手帕刺绣。",
          verified: true,
          data: {
            "图案类型": "传统几何纹样",
            "材料来源": "瑶山纺织厂"
          }
        }
      ]
    }
  },
  6: {
    // 基本信息
    id: 6,
    name: "瑶山野生香菇 200g",
    slogan: "深山野生，营养丰富",
    price: "78",
    originalPrice: "98",
    isNew: false,
    isOrganic: true,
    rating: "4.8",
    sales: "178",
    favorableRate: 95,
    images: [
      "/static/static2/3944.jpg_wh860.jpg",
      "/static/static2/90.jpg"
    ],
    description: [
      "瑶山野生香菇生长在海拔1000米以上的原始森林中，完全野生环境下自然生长，无任何人工干预。",
      "香菇肉质厚实，香味浓郁，富含蛋白质、多种维生素和矿物质，具有很高的营养价值和药用价值。"
    ],
    farmId: 6,
    farmName: "瑶山林业合作社",
    farmLogo: "/static/static2/4378.jpg_wh860.jpg",
    farmLocation: "广西瑶族自治区",
    specs: [
      { label: "品名", value: "瑶山野生香菇" },
      { label: "净含量", value: "200g" },
      { label: "产地", value: "广西瑶族自治区" },
      { label: "保质期", value: "12个月" },
      { label: "储存方法", value: "干燥阴凉处保存" },
      { label: "认证", value: "有机认证、野生认证" }
    ],
    detailImages: [
      "/static/static2/3944.jpg_wh860.jpg"
    ],
    comments: [
      {
        username: "吴*军",
        avatar: "/static/static2/photo-1599566150163-29194dcaad36.avif",
        date: "2025-03-30",
        rating: 5,
        content: "香菇品质很好，香味浓郁，炖汤特别鲜美。"
      }
    ],
    // 区块链溯源信息
    traceInfo: {
      productName: "瑶山野生香菇",
      productImage: "/static/static2/3944.jpg_wh860.jpg",
      traceId: "YSXG-F3286-2025",
      blockHeight: "2,364,123",
      chainTime: "2025-04-01 09:30:20",
      hashValue: "0xf2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
      events: [
        {
          date: "2025-04-01 08:00:00",
          title: "采摘完成",
          description: "在原始森林中完成野生香菇采摘。",
          verified: true,
          data: {
            "采摘重量": "200g",
            "采摘地点": "瑶山原始森林保护区",
            "采摘人": "李护林员（证号: YS20250401）"
          }
        },
        {
          date: "2025-03-25 06:00:00",
          title: "发现记录",
          description: "护林员在巡山时发现成熟的野生香菇群。",
          verified: true,
          data: {
            "发现地点": "海拔1200米处",
            "生长环境": "橡树根部",
            "发现人": "李护林员（证号: YS20250325）"
          }
        }
      ]
    }
  }
};
function getProductById(id) {
  return productsData[id] || null;
}
exports.getProductById = getProductById;
//# sourceMappingURL=../../.sourcemap/mp-weixin/data/products.js.map
