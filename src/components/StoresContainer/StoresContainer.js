import './StoresContainer.css'

function StoresContainer(){
    return(
        <>
        <img className="stores-image" 
                            src={`${process.env.PUBLIC_URL}/images/store-image.jpg`} 
                        />

            <h1>Список магазинов</h1>
            <ul className='store-list'>
                <li>Москва:</li>
                    <ul>
                        <li>ТРЦ «Columbus», Кировоградская ул., 13А, 2 этаж</li>
                    </ul>
                <li>Санкт-Петербург:</li>
                    <ul>
                        <li>ТЦ «Европолис», Полюстровский пр., 84, 3 этаж</li>
                    </ul>
                <li>Казань:</li>
                    <ul>
                        <li>ТРК «Кольцо»,  ул. Петербургская, 1, 4 этаж</li>
                    </ul>
            </ul>
            <h1>Пункты выдачи заказов</h1>
            <ul className='punkts-list'>
                <li>ПВЗ Ozon, Wildberries</li>
                <li>СДЭК</li>
                <li>Почта России</li>
                <li>Самовызов из магазинов</li>
                <li>Доставка курьером</li>
            </ul>
            
        </>
    )
}

export default StoresContainer