import survey from '../../models/survey';
import Joi from 'joi';
import user from '../../models/user';
import CustomErrorHandler from '../../service/CustomErrorHandler';
import otp from '../../models/otp';
import nodemailer from 'nodemailer';

const Survey = {
    async addsurvey(req, res, next) {

        const surveySchema = Joi.object({
            email: Joi.string().email().required(),
            question: Joi.string().min(5).required(),
            option: Joi.string().required()
        })

        const { error } = surveySchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { email, question, option } = req.body;

        const Survey = new survey({
            email,
            question,
            option
        })
        try {
            const document = await Survey.save();
            res.status(201).json(document);
        } catch (error) {
            return next(error);
        }



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
            console.log('hii sumit kumatr singh')
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
            data = await survey.findOne({ _id: req.params.id });
        } catch (error) {
            return next(CustomErrorHandler.servererror());
        }
        res.json(data)
    },
    async emailSend(req, res, next) {
        try {
            const data = await user.findOne({ email: req.body.email });
            if (!data) {
                return next(CustomErrorHandler.notfound('Email is not registered'));
            }
            const ourotp = Math.floor((Math.random() * 10000) + 1);
            const document = new otp({
                email: req.body.email,
                otp: ourotp
            })
            try {
                const dd = await document.save();
                res.status(201).json(dd);
            } catch (error) {
                return next(err);
            }
        } catch (error) {
            return next(error);
        }
    },
    async ChangePassword(req, res, next) {



        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'shivsingh6371913458@gmail.com', // generated ethereal user
                pass: 'asdfA@1234', // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: 'shivsingh6371913458@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Change your password", // Subject line
            text: "your otp is " + req.body.otp, // plain text body
        });
        if (!info)
            return next(error);
        res.status(201).json(info);
    }
}

export default Survey;