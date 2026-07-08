import Button from "./ui/Button";

export interface Comment {
  id: number;
  body: string;
  createdAt: string;

  author: {
    id: number;
    name: string;
  };
}

interface Props {
  comment: Comment;
  canDelete?: boolean;
  deleting?: boolean;
  onDelete?: () => void;
}

export default function CommentCard({
  comment,
  canDelete = false,
  deleting = false,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{comment.author.name}</h3>

          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        {canDelete && (
          <Button
            loading={deleting}
            className="bg-red-600 hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>

      <p className="whitespace-pre-wrap text-gray-700">{comment.body}</p>
    </div>
  );
}
