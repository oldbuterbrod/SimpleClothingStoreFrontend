import './AboutContainer.css'

function AboutContainer(){
    return(
        <>
            <div className="based-bebezians">
                <img className="bebezians-icon"
                    src={`${process.env.PUBLIC_URL}/icons/bebezians_icon.png`} 
                />
                <div className="based-text">
                    <p>Bebezians — это не просто магазин 
                        одежды, это пространство, где стиль 
                        встречается с универсальностью. 
                        Основанный в сентябре 2024 года, 
                        Bebezians был создан 
                        с идеей объединить моду для 
                        всех — мужчин, женщин и детей.</p>
                </div>
            </div>

            <div className='family-bebezians'>
                <img className="family-image"
                        src={`${process.env.PUBLIC_URL}/images/family.jpg`} 
                    />
                <p className='family-text'>
                    Мы верим, что одежда должна быть доступной, стильной и подходящей 
                    для каждого момента жизни. 
                    <br/>Поэтому каждая коллекция Bebezians 
                    создается с учетом разнообразия вкусов и потребностей, 
                    чтобы каждый наш клиент чувствовал себя особенным.
                </p>
            </div>

            <div className='image-store'>
                <img className="store-image"
                            src={`${process.env.PUBLIC_URL}/images/store.jpg`} 
                        />
                <div class="text-on-image">Bebezians — это место, где 
                    классика сочетается с современными трендами, а качество — с заботой о деталях. 
                    Независимо от возраста и предпочтений, в нашем магазине каждый найдет
                     что-то для себя.</div>
            </div>

                 
            
        </>
    )
}

export default AboutContainer