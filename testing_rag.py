from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def vectorStoreCreation():
    vectorStore = client.vector_stores.create(name="patient_records")
    vs_id = vectorStore.id
    return vs_id 

vs_id = os.getenv("VECTOR_STORE_ID")
def vectorStoreUpload(filePath, vs_id):
    with open(filePath, "rb") as f:
        uploaded = client.vector_stores.files.upload_and_poll(
            vector_store_id=vs_id,
            file=f
        )
    
    return uploaded


current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(current_dir))
records_path = os.path.join(current_dir, "patient_records.json")




query="tell me about patients with mental health issues"
 
results = client.vector_stores.search(
    vector_store_id=vs_id, 
    query=query
)


print(f"Query: {query}\n\nResult: {results}")
