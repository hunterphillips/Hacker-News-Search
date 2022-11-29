import commentIcon from '../assets/comment.png';

export const DataTable = ({ list, sortList, sortProp, lightOn }) => {
  const altURL = 'https://news.ycombinator.com/item?id='; // if item url is null

  const setHeaderStyle = (prop) => {
    return prop === sortProp ? { textDecoration: 'underline' } : {};
  };

  return (
    <div className="tableWrap">
      <table
        className="dataTable"
        style={{
          color: lightOn ? '#6e6e6e' : 'white',
        }}
      >
        <tbody>
          <tr>
            <th
              className="titleCol sortHeader"
              style={setHeaderStyle('title')}
              onClick={sortList(list, 'title')}
            >
              title
            </th>
            <th className="linkCol linkHeader"></th>
            <th
              className="sortHeader"
              style={setHeaderStyle('author')}
              onClick={sortList(list, 'author')}
            >
              author
            </th>
            <th
              className="sortHeader"
              style={setHeaderStyle('points')}
              onClick={sortList(list, 'points')}
            >
              points
            </th>
            <th
              className="dateCol dateHeader sortHeader"
              style={setHeaderStyle('created_at')}
              onClick={sortList(list, 'created_at')}
            >
              date
            </th>
          </tr>
          {list.map((item) => (
            <tr key={item.objectID}>
              <td className="titleCol">
                <a
                  href={item.url ? item.url : `${altURL}${item.objectID}`}
                  className="App-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              </td>
              <td className="linkCol">
                <a
                  href={`${altURL}${item.objectID}`}
                  className="App-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="commentIcon"
                    src={commentIcon}
                    alt="comment"
                  />
                </a>
              </td>
              <td className="authorCol">{item.author}</td>
              <td className="pointCol">{item.points}</td>
              <td className="dateCol">{item.created_at.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
