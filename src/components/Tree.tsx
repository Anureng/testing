import React, { useState } from 'react'

interface DATAI {
    DATA: any
}
const Tree = ({ DATA }: DATAI) => {
    console.log(DATA);

    const [open, setOpen] = useState(false)

    return (
        <div>
            {
                DATA?.map((el: any) => (
                    <>
                        <button onClick={() => setOpen(!open)}>{el.label}</button> <br />

                        {
                            open &&
                            <div>
                                {el.children?.map((el: any) => (
                                    <div>
                                        <Tree DATA={el} />
                                    </div>
                                ))}
                            </div>
                        }

                    </>
                ))
            }
        </div>
    )
}

export default Tree
