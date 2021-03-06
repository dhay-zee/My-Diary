//Entry Model

const moment = require('moment');
import query from '../db/connect';

const Entries = {

    /**
     * 
     * @description create an entry
     * @param {*} u_id 
     * @param {*} title 
     * @param {*} content 
     * @returns {object} created entry
     * 
     */
    async create(u_id, title, content) {

        const text = 'INSERT INTO entries(user_id, title, content, date_created) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [u_id, title, content, moment(new Date())];
    
        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };

    },

    /**
     * 
     * @description gets all entries of a user
     * @param {*} u_id 
     * @returns {object} all entries
     * 
     */
    async getAll(u_id){
        
        const text ='SELECT * FROM entries WHERE user_id = $1 ORDER BY id DESC';
        const values = [u_id];

        try{
            const { rows }= await query(text, values);
            return rows;
    
        }catch(err) {
            console.log(err.stack);
        };
        
    },

    /**
     * 
     * @description get one entry
     * @param {*} u_id 
     * @param {*} id 
     * @returns one entry
     * 
     */
    async getOne(u_id, id){

        const text = 'SELECT * FROM entries where user_id = $1 AND id = $2';
        const values = [u_id, id];
        
        try{
            const { rows }= await query(text, values)
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        }

    },

    /**
     * 
     * @description updates an entry
     * @param {*} title 
     * @param {*} content 
     * @param {*} id 
     * @param {*} u_id 
     * @returns {object} updated entry
     * 
     */
    async update(title, content, id, u_id){

        const text = 'UPDATE entries SET title = $1, content = $2 WHERE user_id = $3 AND id = $4 RETURNING *';
        const values = [title, content, u_id, id];
        
        try{
            const { rows }= await query(text, values)
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    /**
     * 
     * @description delete entry
     * @param {*} u_id 
     * @param {*} id 
     * 
     */
    async delete(u_id, id){
        const text = 'DELETE FROM entries WHERE user_id = $1 AND id = $2 RETURNING *';
        const values = [u_id, id];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };

        
    }

}

export default Entries;