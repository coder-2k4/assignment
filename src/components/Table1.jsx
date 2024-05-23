import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function Table1() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?title=the+lord+of+the+rings")
      .then((response) => response.json())
      .then((data) => setData(data.docs))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  console.log(data);
  const tableCustomStyles = {
    headCells: {
      style: {
        background: "#B2ACAB",
        color: "#594D5B",
        fontSize: "20px",
        fontWeight: "bold",
        paddingLeft: "0 10px",
        justifyContent: "center",
        border: "none",
        borderCollapse: "collapse",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
    },
  };
  const columns = [
    {
      name: "Author Name",
      selector: (item) =>
        item.author_name?.join(", ") ? item.author_name : "author",
      flex: 10,
      width: "280px",
      sortable: true,
      style: {
        background: "#B2ACAB",
        color: "#483D41",

        border: "none",
        borderCollapse: "collapse",
      },
    },
    {
      name: "Title",
      selector: (item) => item.title,
      width: "280px",
      sortable: true,
      style: {
        background: "#B2ACAB",
        color: "#483D41",
      },
    },
    {
      name: "Ratings",
      selector: (item) =>
        item.ratings_average ? item.ratings_average : "none",
      width: "280px",
      sortable: true,
      style: {
        background: "#B2ACAB",
        color: "#483D41",
        justifyContent: "center",
      },
    },
    {
      name: "First Publish Year",
      selector: (item) =>
        item.first_publish_year ? item.first_publish_year : "-",
      width: "280px",
      sortable: true,
      style: {
        background: "#B2ACAB",
        color: "#483D41",

        justifyContent: "center",
      },
    },
    {
      name: "Subject",
      selector: (item) => (item.subject ? item.subject : "General"),
      width: "280px",
      sortable: true,
      style: {
        background: "#B2ACAB",
        wordSpacing: "2px",
        color: "#483D41",
      },
    },
    {
      name: "Languages available",
      selector: (item) => item.language?.join(","),
      width: "280px",
      sortable: true,
      style: {
        color: "#483D41",
        background: "#B2ACAB",
        wordSpacing: "2px",
        justifyContent: "center",
      },
    },
  ];

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search">
        <input
          className="Searchinput"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </div>
      <DataTable
        className="table"
        columns={columns}
        data={filteredData}
        fixedHeader
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50, 100]}
        customStyles={tableCustomStyles}
      />
    </div>
  );
}

export default Table1;
