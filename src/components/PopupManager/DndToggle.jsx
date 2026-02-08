import './DndToggle.css';

function DndToggle({ isOn, onToggle}) {
    return (
        <div className='dnd-toggle' onClick={onToggle}>
            <div className={`switch ${isOn ? 'on' : 'off'}`}>
                <div className='slider'></div>
            </div>
            <span className='label'>DND</span>
        </div>
    );
}
export default DndToggle;