contract SimpleStore {
    uint store;
    event SetStore(uint _value);
    
    function set(uint _value) {
        store = _value;
        SetStore(_value);
    }
    
    function get() constant returns (uint _store) {
        return store;
    }
}
