const btn = document.querySelector('.changecolorbtn');
const colorgrid = document.querySelector('.colorgrid');
const colorvalue = document.querySelector('.colorvalue');



btn.addEventListener('click',async()=>{
    // console.log("Clicked..");
    let [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    // console.log(tab);

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function:pickcolor,
    },async(injectionResults)=>{
        // console.log(injectionResults);
        const [data] = injectionResults;
        if(data.result){
            const color = data.result.sRGBHex;
            colorgrid.style.backgroundColor = color;
            colorvalue.innerText = color;
            try{
                await navigator.clipboard.writeText(color);
            }catch(e){
                console.log(e)
            }
            console.log(colorgrid);
        }
    });
});

async function pickcolor(){
    // console.log("script working...");
    try{
        const  eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        // console.log(selectedcolor);
    }catch(e){
        console.log(e);
    }
}