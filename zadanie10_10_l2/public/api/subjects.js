const subjects = [...Array(10)].map((_, i) => ({
    id: i + 1,
    name: `Subject${i + 1}`,
    hoursAWeek: (i + 1) * 2
}));

module.exports = subjects