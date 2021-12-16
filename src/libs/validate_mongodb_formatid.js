module.exports = function validate_id (id) {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var isvalididformat = checkForHexRegExp.test(id);
    return isvalididformat;
}
