import React from 'react';
import img from '../../../assets/brand/brand.jfif'

const DashCard = ({ title, paid, due, profit, expense, bgcolor,icon }) => {
    const formattedPaid = paid?.toLocaleString();
    const formattedDue = due?.toLocaleString();
    const formattedProfit = profit?.toLocaleString();
    const formattedExpense = expense?.toLocaleString();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    return (
        <div>
            <div className="py-2 px-4">
                <div>
                    <div className={`rounded-lg border border-gray-400 lg:mb-6 py-5 shadow-2xl`} style={{ backgroundColor: `${bgcolor}` }}>
                        <div className='text-white pl-4'>
                            <h4 tabIndex="0" className="focus:outline-none font-bold  text-lg">{title}</h4>
                            <hr />
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p tabIndex="0" className="focus:outline-none  text-lg py-2 ">
                                        Paid: {formattedPaid} <br />
                                        <span className=''>Due: {formattedDue}</span> <br />
                                        <span className=''>Profit: {formattedProfit}</span> <br />
                                        <span className=''>Expense: {formattedExpense}</span> <br />
                                    </p>
                                </div>
                                <div>
                                    {/* <h3 className='text-2xl font-bold mr-3'>{month}/{year}</h3> */}
                                    <h3 className='text-3xl font-bold mr-3'>
                                     {icon}
                                    </h3>
                                    {/* <img src={img} width={70} alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashCard;
