import survey from '../../models/survey';
import Joi from 'joi';

const Survey = {
    async addsurvey(req, res, next) {

        const surveySchema = Joi.object({
            email: Joi.string().email().required(),
            question: Joi.string().required(),
            option: Joi.string().required()
        })

        const { error } = surveySchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { email, question, option } = req.body;
        let document = '';
        try {
            document = await survey.create({
                email,
                question,
                option
            })

        } catch (error) {
            return next(error);
        }

        res.status(201).json(document);
    },
    async updateSurvey(req, res, next) {

        const surveySchema = Joi.object({
            email: Joi.string().email().required(),
            question: Joi.string().required(),
            option: Joi.string().required()
        })

        const { error } = surveySchema.validate(req.body);
        if (error) {
            return next(error);

        }
        const { email, question, option } = req.body;
        let document = '';
        try {
            document = await survey.findOneAndUpdate({ _id: req.params.id }, {
                email, question, option
            }, { new: true })

        } catch (error) {
            return next(error);
        }

        res.status(201).json(document);
    },
    async deletesurvey(req, res, next) {
        const data = await survey.findByIdAndRemove({ _id: req.params.id });
        if (!data)
            return next(new Error('nothing to delete'));
        res.json({ data });
    },
    async all(req, res, next) {
        let data;
        try {
            data = await survey.find();
        } catch (error) {
            return next(CustomErrorHandler.servererror());
        }
        res.json(data)
    },
    async getone(req, res, next) {
        let data;
        try {
            data = await survey.findOne({ _id: req.params.email });
        } catch (error) {
            return next(CustomErrorHandler.servererror());
        }
        res.json(data)
    }
}

export default Survey;