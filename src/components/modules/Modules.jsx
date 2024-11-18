import Module from './module/Module.jsx';

const Modules = ({modulesList}) => {
    return (
        <ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {
                modulesList.map((module, index) => (
                    <Module content={module} key={index} />
                ))
            }
        </ul>
    );
};

export default Modules;