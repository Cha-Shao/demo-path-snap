export enum PostType {
  Video,
  Image
}

export interface Post {
  id: number
  type: PostType,
  video: string
  images: string[]
  name:string
  intro: string
  location: string
  position: [number, number]
  card?: {
    title: string
    desc: string
    prize: number
    cover: string
  }
}

const posts: Post[] = [{
  id: 0,
  type: PostType.Video,
  video: '461372a1e18cb78bf0af8db0e732892cf09658d2',
  images: [],
  name: '广州塔',
  intro: '广州塔（英语：Canton Tower）又称广州新电视塔，昵称小蛮腰，其位于中国广东省广州市海珠区（艺洲岛）赤岗塔附近，距离珠江南岸125米，与珠江新城、花城广场、海心沙岛隔江相望。广州塔塔身主体高454米，天线桅杆高146米，总高度600米 [31-32]。是中国第一高塔 [33-34]，是国家AAAA级旅游景区。广州塔是广州市的地标工程，电视塔可抵御8级地震、12级台风，设计使用年限超过100年 [1] 。广州塔塔身168~334.4米处设有“蜘蛛侠栈道”，是世界最高最长的空中漫步云梯。塔身422.8米处设有旋转餐厅，是世界最高的旋转餐厅 [3] 。塔身顶部450~454米处设有摩天轮，是世界最高摩天轮 [4] 。天线桅杆455~485米处设有“极速云霄”速降游乐项目，是世界最高的垂直速降游乐项目 [5] 。广州塔隶属广州城投集团，由广州市建筑集团有限公司和上海建工集团负责施工，总建筑面积114054平方米，2009年9月竣工，2010年9月30日正式对外开放，2010年10月1日正式公开售票接待游客 [6] 。广州塔有5个功能区和多种游乐设施，包括户外观景平台、摩天轮、极速云霄游乐项目，有2个观光大厅，有悬空走廊，天梯，4D和3D动感影院，中西美食，会展设施，购物商场及科普展示厅。',
  location: '广州市海珠区阅江西路222号',
  position: [113.324553, 23.106414]
}, {
  id: 1,
  type: PostType.Image,
  video: '',
  images: [
    '7195434091a6f5dfeb8fe06d0a9ea32fccfae18c',
    'dd3e7fd54b1b20bc3a4c6d8cf181df2eeb737217',
  ],
  name: '天安门',
  intro: '天安门（Tian\'anmen），坐落在中华人民共和国首都北京市的中心、故宫的南端，与天安门广场以及人民英雄纪念碑、毛主席纪念堂、人民大会堂、中国国家博物馆隔长安街相望，占地面积4800平方米，以杰出的建筑艺术和特殊的政治地位为世人所瞩目。',
  location: '北京市东城区长安街',
  position: [116.397455, 39.909187]
}]

export default posts
