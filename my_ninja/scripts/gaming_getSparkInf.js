/**
 * Created by Administrator on 2017/3/16.
 */
// 炸弹火花信息类
var Spark_inf = {
    createNew: function(){
        var spark_inf = {};
        spark_inf.x = 0;
        spark_inf.y = 0;
        spark_inf.offset_angle = 0 * Math.PI/180;
        spark_inf.angle = 0 * Math.PI/180;
        spark_inf.scale_rate = 1;
        return spark_inf;
    }
};