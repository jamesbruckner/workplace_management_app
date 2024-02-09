const router = require('express').Router();
const { Schedules } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try{
        const newEvent = await Schedules.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newEvent);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try{

        const eventData = await Schedules.update(req.body, {
            where: {
                id: req.params.id,
            },
        });


        if(!eventData) {
            res.status(404).json({ message: 'No event found with this ID :(' });

            return;
        }

        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Schedules.destroy({
            where: {
                id: req.params.id, 
                user_id: req.session.user_id,
            },
        });


        if(!eventData) {
            res.status(404).json({ message: 'No event found with this id :(' });
            return;
        }

        res.status(200).json(eventData);
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', withAuth, async(req, res) => {
    try {
        const eventData = await Schedules.findAll();
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});