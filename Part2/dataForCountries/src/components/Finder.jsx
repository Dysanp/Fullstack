const Finder = ({finder, handleFinder}) => (
    <form>
          <div>
            find countries <input value = {finder}
            onChange={handleFinder}/>
          </div>
    </form>  
)
export default Finder