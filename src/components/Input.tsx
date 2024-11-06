import React, { useState } from 'react'


interface OBJECT {
    id: number,
    Text: string,
    Date: number,
}

const Input = () => {

    const [text, setText] = useState('')
    const [descr, setDescr] = useState('')
    const [dataa, setDataa] = useState<any>([])
    const [editText, setEditText] = useState(false)

    const AddDetails = () => {
        const data = {
            id: Math.random(),
            Text: text,
            Date: String(Date.now()),
            Reply: [
                {
                    id: Math.random(),
                    desc: descr
                }
            ]
        }

        setDataa([...dataa, data])
    }

    const EditButton = () => {
        const data = {
            id: Math.random(),
            Text: text,
            Date: String(Date.now()),
            Reply: [
                {
                    id: Math.random(),
                    desc: descr
                }
            ]
        }
        setDataa([...dataa, data.Reply])
    }


    return (
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
            <button onClick={AddDetails}>Add Comment</button>

            <p>
                {dataa.map((el: any) => (
                    <div key={el.id}>
                        <p>{el.Text}</p>
                        <button onClick={() => setEditText(!editText)}>Edit</button>
                        {
                            editText &&
                            (
                                <>
                                    <input type="text" onChange={(e) => setDescr(e.target.value)} value={descr} />
                                    <button onClick={EditButton}>Add Edit</button>
                                </>
                            )
                        }

                        <p>{el.Reply?.map((el: any) => (
                            <>
                                <p>{el.Text}</p>
                            </>
                        ))}</p>
                    </div>
                ))}
            </p>
        </div>
    )
}

export default Input
