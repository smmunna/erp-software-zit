import React from 'react';

const Spinner = () => {
    return (
        <div>
            <div className='flex justify-center py-4'>
                <div>
                    <span className="loading loading-spinner text-secondary w-12"></span>
                </div>
            </div>
        </div>
    );
}

export default Spinner;
