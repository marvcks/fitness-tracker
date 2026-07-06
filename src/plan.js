export const weekPlans = [
  {
    dayKey: 'monday',
    label: '周一',
    title: '胸 + 肩 + 短跑适应',
    goal: '建立上肢推力，改善胸肩线条。',
    exercises: [
      { id: 'chest-press', name: '器械坐姿推胸', type: 'strength', target: '3 x 10-12', cue: '背贴靠垫，推起不锁死手肘', muscle: '胸部', icon: 'press' },
      { id: 'pec-deck', name: '器械坐姿飞鸟', type: 'strength', target: '3 x 10-12', cue: '胸部发力夹合，肩不要耸', muscle: '胸部', icon: 'fly' },
      { id: 'shoulder-press', name: '坐姿肩上举', type: 'strength', target: '2 x 10-12', cue: '轻重量开始，避免腰后仰', muscle: '肩部', icon: 'shoulder' },
      { id: 'lateral-raise', name: '哑铃侧平举', type: 'strength', target: '2 x 12-15', cue: '小重量，抬到肩高即可', muscle: '肩部', icon: 'lateral' },
      { id: 'run-walk-short', name: '跑步机慢跑/快走', type: 'cardio', target: '6-8 分钟', cue: '1 分钟慢跑 + 1 分钟快走循环', muscle: '心肺', icon: 'run' }
    ]
  },
  {
    dayKey: 'tuesday',
    label: '周二',
    title: '背 + 二头 + 核心',
    goal: '改善背部发力，提升体态和上肢拉力。',
    exercises: [
      { id: 'lat-pulldown', name: '反握肩距坐姿下拉', type: 'strength', target: '3 x 10-12', cue: '先沉肩，再把手肘向下拉', muscle: '背部', icon: 'pulldown' },
      { id: 'seated-row', name: '窄握坐姿划船', type: 'strength', target: '3 x 10-12', cue: '胸挺起，肩胛骨向后夹', muscle: '背部', icon: 'row' },
      { id: 'db-curl', name: '哑铃弯举', type: 'strength', target: '2 x 10-12/侧', cue: '上臂尽量固定，不甩身体', muscle: '二头', icon: 'curl' },
      { id: 'db-kickback', name: '俯身哑铃臂屈伸', type: 'strength', target: '2 x 10-12/侧', cue: '肘部固定，轻重量控制', muscle: '三头', icon: 'kickback' },
      { id: 'plank', name: '平板支撑', type: 'cardio', target: '3 x 20-30 秒', cue: '腰腹收紧，不塌腰', muscle: '核心', icon: 'plank', unit: '秒' }
    ]
  },
  {
    dayKey: 'wednesday',
    label: '周三',
    title: '腿 + 臀 + 轻有氧',
    goal: '强化下肢基础，提升全身消耗和稳定性。',
    exercises: [
      { id: 'machine-squat', name: '器械深蹲', type: 'strength', target: '3 x 10-12', cue: '膝盖朝脚尖方向，腰背稳定', muscle: '臀腿', icon: 'squat' },
      { id: 'leg-extension', name: '器械腿屈伸', type: 'strength', target: '3 x 10-12', cue: '顶端停 1 秒，慢慢放下', muscle: '腿前侧', icon: 'extension' },
      { id: 'leg-curl', name: '器械腿弯举', type: 'strength', target: '3 x 10-12', cue: '感受大腿后侧发力', muscle: '腿后侧', icon: 'legcurl' },
      { id: 'glute-bridge', name: '徒手臀桥', type: 'strength', target: '2 x 12-15', cue: '顶端夹臀 1 秒', muscle: '臀部', icon: 'bridge' },
      { id: 'incline-walk', name: '坡度快走', type: 'cardio', target: '6-8 分钟', cue: '坡度 3-6%，速度能说短句', muscle: '心肺', icon: 'walk' }
    ]
  },
  {
    dayKey: 'thursday',
    label: '周四',
    title: '全身循环 + 跑步进阶',
    goal: '提高心肺和全身肌肉耐力，不追求大重量。',
    exercises: [
      { id: 'circuit-press', name: '器械坐姿推胸', type: 'strength', target: '3 轮 x 10', cue: '中轻重量，动作稳定', muscle: '胸部', icon: 'press' },
      { id: 'circuit-pulldown', name: '反握坐姿下拉', type: 'strength', target: '3 轮 x 10', cue: '背部主动发力', muscle: '背部', icon: 'pulldown' },
      { id: 'circuit-squat', name: '器械深蹲', type: 'strength', target: '3 轮 x 10', cue: '稳定控制', muscle: '臀腿', icon: 'squat' },
      { id: 'circuit-lateral', name: '哑铃侧平举', type: 'strength', target: '3 轮 x 12', cue: '小重量，慢起慢落', muscle: '肩部', icon: 'lateral' },
      { id: 'crunch', name: '卷腹', type: 'strength', target: '3 轮 x 12-15', cue: '不用手拉脖子', muscle: '核心', icon: 'crunch' },
      { id: 'interval-run', name: '跑步机间歇', type: 'cardio', target: '8 分钟', cue: '30 秒慢跑 + 90 秒快走 x 4', muscle: '心肺', icon: 'run' }
    ]
  },
  {
    dayKey: 'friday',
    label: '周五',
    title: '手臂 + 肩背补强 + 轻松跑',
    goal: '补强手臂肩背，周末前不过度疲劳。',
    exercises: [
      { id: 'friday-shoulder', name: '坐姿肩上举', type: 'strength', target: '3 x 10-12', cue: '控制重量，肩无痛为准', muscle: '肩部', icon: 'shoulder' },
      { id: 'friday-lateral', name: '哑铃侧平举', type: 'strength', target: '2 x 12-15', cue: '慢起慢落', muscle: '肩部', icon: 'lateral' },
      { id: 'friday-row', name: '窄握坐姿划船', type: 'strength', target: '3 x 10-12', cue: '背部夹紧，不耸肩', muscle: '背部', icon: 'row' },
      { id: 'friday-curl', name: '哑铃弯举', type: 'strength', target: '2 x 10-12', cue: '左右均衡', muscle: '二头', icon: 'curl' },
      { id: 'friday-kickback', name: '俯身哑铃臂屈伸', type: 'strength', target: '2 x 10-12/侧', cue: '肘部固定', muscle: '三头', icon: 'kickback' },
      { id: 'easy-run', name: '轻松跑/快走', type: 'cardio', target: '8-10 分钟', cue: '全程能讲话，不冲刺', muscle: '心肺', icon: 'run' }
    ]
  }
];

export function getPlanByDayKey(dayKey) {
  return weekPlans.find((plan) => plan.dayKey === dayKey) || weekPlans[0];
}

export function getDefaultDayKey(date = new Date()) {
  const day = date.getDay();
  if (day >= 1 && day <= 5) return weekPlans[day - 1].dayKey;
  return 'monday';
}
