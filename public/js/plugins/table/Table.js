export default class Table
{
    parent
    config = {}

    setTbody(_tbody)
    {
        this.config.tbody = _tbody;
    }

    setRows(_rows)
    {
        this.config.rows = _rows;
    }

    render()
    {        
        // Clear parent
        this.parent.innerHTML = '';
    }
}