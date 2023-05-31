// import styles from "./EditOffer.module.scss";

// interface Props {
//   tags: string[];
//   setTags: (tags: string[]) => void;
//   removeTag: (index: number) => void;
//   handleTagKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
// }

// export default function SearchTags({
//   tags,
//   setTags,
//   removeTag,
//   handleTagKeyPress,
// }: Props) {
//   return (
//     <div className="mt-8">
//       <p className="mb-2 font-light	text-gray-100">
//         <label>Search Tags</label>
//       </p>
//       <div className={`sm:my-2 ${styles.searchTagInputField} relative`}>
//         {tags.map((tag, index) => (
//           <>
//             <span key={index} className={styles.tag}>
//               {tag}
//               <span
//                 className={styles.removeTag}
//                 onClick={() => removeTag(index)}
//               >
//                 ×
//               </span>
//             </span>
//             <span className={styles.tag}>+</span>
//           </>
//         ))}
//         {tags.length < 5 && (
//           <input
//             type="text"
//             onKeyPress={handleTagKeyPress}
//             maxLength={15}
//             className={`${styles.searchTagInput}`}
//             placeholder="Add Search Tag"
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import styles from "./EditOffer.module.scss";

interface Props {
  tags: string[];
  removeTag: (index: number) => void;
  handleTagKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchTags({
  tags,
  removeTag,
  handleTagKeyPress,
}: Props) {
  return (
    <div className="mt-8">
      <p className="mb-2 font-light	text-gray-100">
        <label>Search Tags</label>
      </p>
      <div className={`sm:my-2 ${styles.searchTagInputField} relative`}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
            <span className={styles.removeTag} onClick={() => removeTag(index)}>
              ×
            </span>
          </span>
        ))}
        {tags.length < 5 && (
          <input
            type="text"
            onKeyDown={handleTagKeyPress}
            maxLength={15}
            className={`${styles.searchTagInput}`}
            placeholder="Add Search Tag"
          />
        )}
      </div>
    </div>
  );
}
