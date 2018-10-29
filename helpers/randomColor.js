const colors=['red','blue','green','green2','gray','yellow','black'];

const randomColor= ()=>{
    return colors[Math.floor(Math.random()*colors.length)];
};

module.exports=randomColor;