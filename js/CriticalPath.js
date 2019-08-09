
function TopSort(T,ve,itemsArray){//�����������翪ʼʱ��
			var m=0;
			var S=[];
			var ind=[];
			for(i=0;i<itemsArray.length;i++){
				ind.push(itemsArray[i].indegree);
			}
			//itemsArray.forEach((item,i,arr)=>{
				//ind.push(arr[i].indegree);
			//})
			for(i=0;i<itemsArray.length;i++){
				if(!itemsArray[i].indegree){
					S[S.length]=i;//������Ϊ0�Ķ�����ջs
				}
				ve[i]=0;//1��ʼ��veֵΪ0
			}
			while(S[0]==S[0] ){
				var q=S.pop();
				T.push(q);
				m=m+1;
				var p=itemsArray[q].node;
				while(p){//��p��Ϊ��
					k=p.inumber-1;/*!!!!!!!!*/
					--ind[k];
					if(!ind[k])//��k�����Ϊ0ʱִ��
						S.push(k);
					if(Number(ve[q])+Number(itemsArray[q].last)/*!!!!!!!!*/>Number(ve[k]))
						ve[k]=Number(ve[q])+Number(itemsArray[q].last);/*!!!!!!!!*/
					p=p.next;/*!!!!!!!!*/
				}
			}
			if(m<itemsArray.length)	return false;
			else return true;
		}
		
		function CriticalPath(T,ve,itemsArray,vl){//�ؼ�·��
			//if(!TopSort)	console.log('error');//���л�·������־�����error
			//else{
				
				var tempmax=ve[GetTop(T)]
				for(var i=0;i<itemsArray.length;++i){
					vl[i]=tempmax;
				}
				while(T.length>0){//��T��Ϊ��
				
					i=T.pop();
					var p=itemsArray[i].node;
					while(p){//��p��Ϊ��
					
						if (p.inumber== undefined ){
							break;
						}
						k=p.inumber-1;/*!!!!!!!!*/
						if(vl[k]-itemsArray[i].last/*LList.VNode[k].time*/<vl[i])
							vl[i]=vl[k]-itemsArray[i].last;/*!!!!!!!!*/
						p=p.next;/*!!!!!!!!*/
					}
				}
			//}
		}
		function GetTop(T){
			var t=T[0];
			for(i=0;i<T.length;i++){
				if(T[i]>t){
					t=T[i];
				}
			}
			return t;
		}
		function alltime(itemsArray,ve,vl,vef,vlf,vf){
			console.log(itemsArray);
			for(i=0;i<itemsArray.length;i++){
				vef[i]=ve[i]+Number(itemsArray[i].last);
				vlf[i]=vl[i]+Number(itemsArray[i].last);
				vf[i]=vlf[i]-vef[i];
			}
			console.log(ve,vl,vef,vlf,vf);
		}