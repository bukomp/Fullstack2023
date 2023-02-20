const Filter = ({ filter, handleFilterChange }) => {
    return (
        <>
            find countries<input value={filter} onChange={handleFilterChange} />
        </>
    )
}

export default Filter