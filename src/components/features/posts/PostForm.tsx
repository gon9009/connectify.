import Label from "../../ui/Label";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreatePost, useUpdatePost } from "../../../lib/react-query/queries";


// 포스트 폼 필드 
const PostForm = ({ post, action, onCreate, onUpdate }) => {

    const onSubmit = () => {
        return (

        )
    }

    return (
      <form>
        {/* Caption 필드 */}
        <div>
          <Label htmlFor="caption">Caption</Label>
          <Textarea id="caption" />
        </div>
  
        {/* 파일 업로더 자리 표시 */}
        <div>
          <Label>사진 추가하기</Label>
          <div>파일 업로더 영역</div>
        </div>
  
        {/* Location 필드 */}
        <div>
          <Label htmlFor="location">위치 추가하기</Label>
          <Input id="location" />
        </div>
  
        {/* Tags 필드 */}
        <div>
          <Label htmlFor="tags">태그 추가하기</Label>
          <Input id="tags" />
        </div>
  
        {/* 기본 버튼 그룹 */}
        <div>
          <Button>취소</Button>
          <Button>제출</Button>
        </div>
      </form>
    );
  };