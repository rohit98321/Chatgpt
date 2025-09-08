const  { Pinecone } =require('@pinecone-database/pinecone') 

const pc = new Pinecone({ apiKey:process.env.PINECONE_API_KEY });

const chatgptIndex=pc.index("chatgpt")

const createMemory=async ({vectors,metadata,messageId})=>{

    await chatgptIndex.upsert([{
        id:messageId,
        values:vectors,
        metadata
    }])

}

const queryMemory =async({queryVector,limit=5,metadata})=>{

        const data= await chatgptIndex.query({
            vector:queryVector,
            topK:limit,
            filter: Object.keys(metadata).length ? metadata : undefined,
            includeMetadata:true
        })

        return data.matches

}

module.exports={
    createMemory,
    queryMemory
}