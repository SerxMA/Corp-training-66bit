import Module from './module/Module.jsx';

const Modules = ({modulesList, setIsDataChanged}) => {
    return (
        <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {
                modulesList.map((module, index) => (
                    <Module content={module} key={index} setIsDataChanged={setIsDataChanged}/>
                ))
            }
        </ul>
    );
};

export default Modules;