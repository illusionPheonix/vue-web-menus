//删除事件
function deleteEvent(that, fn, id) {
    that.$confirm("此操作将永久删除该内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    })
        .then(async () => {
            let res = await fn(id);
            res = res.data;
            if (res.code === 200) {
                that.getList();
                that.$message({
                    type: "success",
                    message: "删除成功!"
                });
            }
        })
        .catch(() => {
            that.$message({
                type: "info",
                message: "已取消删除"
            });
        });
}
import {
    isUserShare
} from "@/api/api";
export default async function deleteFn(that, fn, id) {
    let res = await isUserShare(id);
    res = res.data;
    if (res.code === 200) {
        if (res.data) {
            that.$confirm("当前数据关联了文化主账号，请确认是否删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    deleteEvent(that, fn, id);
                })
                .catch(() => {
                    that.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        } else {
            deleteEvent(that, fn, id);
        }
    }
}

