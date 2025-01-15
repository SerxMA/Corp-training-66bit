const ProgressCircle = ({ isGreen }) => {
    const outerCircleStyle = {
        width: '20px', // Размер внешнего контейнера с отступом
        height: '20px',
        borderRadius: '50%',
        border: '2px solid black', // Граница окружности
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px', // Отступ между границей и заливкой
        boxSizing: 'border-box',
        borderColor: 'var(--content-subPrimary)'
      };
    
      const innerCircleStyle = {
        width: '12px', // Размер внутреннего круга
        height: '12px',
        borderRadius: '50%',
        backgroundColor: isGreen ? 'var(--system-danger-primary)' : 'var(--system-success-primary)',
      };
    
      return (
        <div style={outerCircleStyle}>
          <div style={innerCircleStyle}></div>
        </div>
      );
};

export default ProgressCircle;
