const Schedule = require('../models/schedule'); // Schedule 모델을 가져옴
const { Op } = require('sequelize');

exports.getScheduleByDate = async (req, res) => {
    try {
        const { date } = req.params; // 변경된 부분
        const { clubs } = req.query;

        const userClubs = JSON.parse(clubs);

        const startDate = new Date(date);
        const endDate = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);

        const clubSchedules = await Schedule.findAll({
            where: {
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                },
                club_id: {
                    [Op.in]: userClubs
                }
            },
        });

        const subclubSchedules = await Schedule.findAll({
            where: {
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                },
                subclub_id: {
                    [Op.in]: userClubs
                }
            },
        });

        const schedules = [...clubSchedules, ...subclubSchedules];

        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
