import commentIcon from '../assets/comment.png';

export const DataTable = ({ list, sortList, sortProp, lightOn }) => {
  const altURL = 'https://news.ycombinator.com/item?id='; // if item url is null

  // underline selected column header
  const setUnderline = (prop) => {
    return prop === sortProp ? 'underline' : '';
  };

  return (
    <div className="table-container">
      <table
        className="table"
        style={{
          color: lightOn ? '#6e6e6e' : 'white',
        }}
      >
        <tbody>
          <tr>
            <th
              className={`title-col ${setUnderline('title')}`}
              onClick={sortList(list, 'title')}
            >
              title
            </th>
            <th className="center"></th>
            <th
              className={`author-col ${setUnderline('author')}`}
              onClick={sortList(list, 'author')}
            >
              author
            </th>
            <th
              className={`center ${setUnderline('points')}`}
              onClick={sortList(list, 'points')}
            >
              points
            </th>
            <th
              className={`date-col center ${setUnderline('created_at')}`}
              onClick={sortList(list, 'created_at')}
            >
              date
            </th>
          </tr>
          {list.map((item) => (
            <tr key={item.objectID}>
              <td className="title-col">
                <a
                  href={item.url ? item.url : `${altURL}${item.objectID}`}
                  className="App-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              </td>
              <td className="center">
                <a
                  href={`${altURL}${item.objectID}`}
                  className="App-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="comment-icon"
                    src={commentIcon}
                    alt="comment"
                  />
                </a>
              </td>
              <td className="author-col">{item.author}</td>
              <td className="point-col center">{item.points}</td>
              <td className="date-col">{item.created_at.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
