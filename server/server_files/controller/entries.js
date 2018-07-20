import entries from '../model/entries';
/**
 * @class entries
 */
class Entries {
    /**
     * @returns {Object} recipes
     * @param {*} req
     * @param {*} res
     */
    static getEntries(req, res) {
      return res.json({
        entries
      });
    }
    static createEntry(req, res) {
        entries.push({
          id: entries.length + 1,
          title: req.body.title,
          content: req.body.content,
          date_created: req.body.date_created,
          modified: 0
        });
        return res.json({
          entries,
          message: 'new entry created',
          error: false
        });
      }
}

export default Entries