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
  /**
   * @returns {object} removeEcipes
   * @param {*} req
   * @param {*} res
   */
  static deleteEntry(req, res) {
    let i = 0;
    while(i < entries.length){
      if (entries[i].id === parseInt(req.params.id, 10)) {
        entries.splice(i, 1);
        return res.json({
          message: 'entry removed',
        });
      }
      i++;
    }

    return res.status(404).json({
      message: 'entry not found',
      error: true
    });
  }

   /**
   * @returns {Object} updateRecipes
   * @param {*} req
   * @param {*} res
   */
  static modifyEntry(req, res) {
    let i = 0
    while(i<entries.length){
      if (entries[i].id === parseInt(req.params.id, 10)) {
          entries[i].title = req.body.title;
          entries[i].content = req.body.content;
          entries[i].modified = 1;
          return res.json({
            entries,
            message: 'entry modified successfully',
            error: false
          });
        }
      i++
    }
    return res.status(404).json({
      message: 'entry not found',
    });
  }
    static retrieveEntry(req, res) {
      let i = 0;
      while(i < entries.length){
        if (entries[i].id === parseInt(req.params.id, 10)) {
          return res.json({
            entries: entries[i],
            message: 'entry retrieved',
          });
        }
        i++;
      }
      return res.status(404).json({
        message: 'entry not found',
        error: true
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