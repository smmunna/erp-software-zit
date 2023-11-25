import React, { useState } from 'react';
import PageHeading from '../../../../components/Dashboard/PageHeading/PageHeading';
import useCustomerList from '../../../../hooks/useCustomerList';
import Spinner from '../../../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const CustomerList = () => {
  const { customerList, error, loading, refetchData } = useCustomerList();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchTerm
    ? customerList.filter(
        (soft) =>
          soft.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          soft.contact_no.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customerList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (searchItem) => {
    setSearchTerm(searchItem);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  return (
    <div className='min-h-screen dashbg'>
      <PageHeading title={`Customer List`} />

      <div className='p-5 '>
        {loading ?<>
          {/* <Spinner /> */}
        </> 
         : (
          <>
            {currentItems.length === 0 ? (
              <div className='flex justify-center py-4'>
                <div>
                  <h3 className='text-red-500'>Customer information not found..!</h3>
                </div>
              </div>
            ) : (
              <>
                <div className='py-1'>
                  <input
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Search by name or phone...'
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                <div className='overflow-auto rounded-lg shadow w-[350px] md:w-[500px] lg:w-full'>
                  <table className='w-full'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                      <tr aria-rowspan={2}>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Phone</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Email</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {currentItems.map((customer, index) => (
                        <tr key={index + 1} className='bg-white'>
                          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                            <Link to={`/dashboard/view-customer/${customer.contact_no}`}>{customer.client}</Link>
                          </td>
                          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{customer.contact_no}</td>
                          <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{customer.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='flex justify-center space-x-2 py-4'>
                  <Pagination
                    current={currentPage}
                    total={customerList.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
