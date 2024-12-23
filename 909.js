import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TablePagination, Avatar, CircularProgress, Paper, Typography } from '@mui/material';
import './App.css';  // Import the CSS file

const placeholderImage = "https://via.placeholder.com/40";

// Mock data
const mockTransactions = [
  { id: 1, studentId: 1, amountPaid: 5000, paymentDate: '2024-12-01', type: 'Online', academicYear: '2024-2025', receiptNumber: 'RCPT1234' },
  { id: 2, studentId: 2, amountPaid: 4500, paymentDate: '2024-11-15', type: 'Offline', academicYear: '2024-2025', receiptNumber: 'RCPT1235' },
  { id: 3, studentId: 3, amountPaid: 6000, paymentDate: '2024-10-20', type: 'Online', academicYear: '2024-2025', receiptNumber: 'RCPT1236' },
];

const mockStudents = {
  1: { name: 'John Doe', class: '10', section: 'A', image: placeholderImage },
  2: { name: 'Jane Smith', class: '11', section: 'B', image: placeholderImage },
  3: { name: 'Robert Brown', class: '12', section: 'C', image: placeholderImage },
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setTransactions(mockTransactions);
    setStudents(mockStudents);
    setLoading(false);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Student Fee Transactions
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Amount Paid</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Academic Year</TableCell>
              <TableCell>Receipt Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => {
                const student = students[transaction.studentId];
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>
                      <Avatar alt={student?.name} src={student?.image || placeholderImage} />
                      {student?.name || 'Loading...'}
                    </TableCell>
                    <TableCell>{student?.class || 'Loading...'}</TableCell>
                    <TableCell>{student?.section || 'Loading...'}</TableCell>
                    <TableCell>{transaction.amountPaid}</TableCell>
                    <TableCell>{transaction.paymentDate}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.academicYear}</TableCell>
                    <TableCell>{transaction.receiptNumber}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default App;
