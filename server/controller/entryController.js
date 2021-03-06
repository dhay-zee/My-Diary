// Entry Controller

import moment from 'moment';
import Entries from '../model/entryModel';

const Entry = {

    /**
     * 
     * @description create new entry
     * @param {*} req 
     * @param {*} res 
     * @returns {object} neeEntry
     * 
     */
    async create(req, res) {
        if(!req.userid || !req.body.title || !req.body.content){
            return res.status(400).send({message: 'missing field'});
        }

        try{
            const newEntry  = await Entries.create(req.userid, req.body.title, req.body.content);
            return res.status(201).send(newEntry);
        }catch(error){
            return res.status(400).send({error: error});
        }

    },

    /**
     * 
     * @description get all enteries by a user
     * @param {*} req 
     * @param {*} res 
     * @returns {Array} allEntries
     * 
     */
    async getAll(req, res){
        try{

            const allEntries = await Entries.getAll(req.userid);
            if(!allEntries) {
                return res.status(200).send({message :'no entry'});
            }
            return res.status(200).send(allEntries);

        }catch(error){
            return res.status(400).send({error: error});
        }
        
    },

    /**
     * 
     * @description get one entry by a user with given entry id
     * @param {*} req 
     * @param {*} res
     * @returns {Array} oneEntry
     * 
     */
    async getEntry(req, res){
        try{
            const oneEntry = await Entries.getOne(req.userid, req.params.id);
            if(!oneEntry) {
                return res.status(404).send({message :'not found'});
            }
            return res.status(200).send(oneEntry);

        }catch(error){
            return res.status(400).send({error: error});
        }
    },

    /**
     * 
     * @description modify a given entry
     * @param {*} req 
     * @param {*} res 
     * @returns {object} update
     * 
     */
    async modifyEntry(req, res){
        try{
            const findEntry = await Entries.getOne(req.userid, req.params.id);
            if(!findEntry) {
                return res.status(404).send({message:'not found'});
            }

            const diff = (moment(new Date()) - findEntry.date_created)/3600000;
            if(diff >= 24){
                return res.status(400).send({message:'cannot update entry'});
            }

            const update = await Entries.update(req.body.title, req.body.content, req.params.id, req.userid);

            return res.status(200).send(update);
        }
        catch(error){
            return res.status(400).send({error: error});
        }
    },
    
    /**
     * 
     * @description delete an entry
     * @param {*} req 
     * @param {*} res 
     * @returns {object} message
     * 
     */
    async delete(req, res){
        try{
            const deleteEntry = Entries.delete(req.userid, req.params.id);
            if(!deleteEntry){
                return res.status(404).send('not found');
            }
            return res.status(200).send({message:'entry deleted'});
        }
        catch(error){
            return res.status(400).send({error: error});

        }

    }
}

export default Entry;