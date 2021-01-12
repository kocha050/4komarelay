import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

const Scroll = (props: any) => {
  //表示するデータ
  const [list, setList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  //項目を読み込むときのコールバック
  const loadMore = async (page: any) => {
    const apiurl = "http://localhost:3000/api/method/completed?page=" + page;
    const res = await fetch(apiurl);
    const data = await res.json(); //取得データ

    // (async () => {
    //    console.log("即時間数スタート");

    // })();
    // const apiurl = "http://localhost:3000/api/method/completed?page=" + page;
    // const data = await fetch(apiurl)
    //   .then((res) => {
    //     console.log("通信に成功しました");
    //     return res.json();
    //   })
    //   .catch((error) => {
    //     console.error("通信に失敗しました", error);
    //     return null;
    //   });
    console.log("page" + page);
    // console.log("---------");
    // console.log(data);
    // console.log("---------");
    // console.log("length" + data.length);

    //   データ件数が0件の場合、処理終了
    if (data.length < 1) {
      console.log("おしまい");
      setHasMore(false);
      return;
    }

    // console.log("for文開始"); //ここで止まっている
    //apiからとってきたデータをlistに追加する
    const newList: any[] = [];
    data.forEach(function (da: any) {
      //   setList([...list, da.url]);
      newList.push(da.url);
    });
    setList([...list, ...newList]);
    console.log("後list:" + newList);

    // setList([...list, ...data]);
    // console.log("for文終了");
  };

  //各スクロール要素
  const items = (
    <ul>
      {list.map((value, index) => (
        // <li>{value}</li>
        <img key={index} src={value} alt={"sample"} />
      ))}
    </ul>
  );

  //全体のスタイル
  const root_style = {
    marginLeft: "50px",
    marginTop: "50px",
  };

  //ロード中に表示する項目
  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  return (
    <div style={root_style}>
      <InfiniteScroll
        loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
        hasMore={hasMore} //読み込みを行うかどうかの判定
        loader={loader}
      >
        {" "}
        {/* 読み込み最中に表示する項目 */}
        {items} {/* 無限スクロールで表示する項目 */}
      </InfiniteScroll>
    </div>
  );
};

export default Scroll;
