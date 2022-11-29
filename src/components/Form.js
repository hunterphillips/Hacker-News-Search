export const Form = ({
  onSubmit,
  lightOn,
  searchTerm,
  setSearchTerm,
  setQuery,
}) => {
  return (
    <form
      className="formWrap"
      onSubmit={(e) => onSubmit(e)}
      style={{
        color: lightOn ? '#303030' : 'white',
      }}
    >
      <div className="formElementWrap" style={{ paddingRight: '1em' }}>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button type="submit" disabled={!searchTerm}>
          Submit
        </button>
      </div>
      <div className="formElementWrap">
        <label htmlFor="filter">Filter: </label>
        <input
          id="filter"
          type="text"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </div>
    </form>
  );
};
